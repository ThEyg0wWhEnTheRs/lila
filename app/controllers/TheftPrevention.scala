package controllers

import play.api.mvc.*

import lila.app.{ *, given }
import lila.game.{ AnonCookie }
import lila.core.id.GamePlayerId
import lila.game.GameExt.playerById

private[controllers] trait TheftPrevention:
  self: LilaController =>

  protected def PreventTheft(pov: Pov)(ok: => Fu[Result])(using Context): Fu[Result] =
    if isTheft(pov) then Redirect(routes.Round.watcher(pov.gameId, pov.color.name))
    else ok

  protected def isTheft(pov: Pov)(using Context) =
    pov.game.isPgnImport || pov.player.isAi || {
      (pov.player.userId, ctx.userId) match
        case (Some(_), None)                    => true
        case (Some(playerUserId), Some(userId)) => playerUserId != userId
        case (None, _) =>
          !lila.security.Mobile.Api.requested(ctx.req) &&
          !ctx.req.cookies.get(AnonCookie.name).exists(_.value == pov.playerId.value)
    }

  protected def isMyPov(pov: Pov)(using Context) = !isTheft(pov)

  protected def playablePovForReq(game: lila.core.game.Game)(using Context) =
    (!game.isPgnImport && game.playable).so:
      ctx.userId
        .flatMap(game.player)
        .orElse:
          ctx.req.cookies
            .get(AnonCookie.name)
            .map(c => GamePlayerId(c.value))
            .flatMap(game.playerById)
            .filterNot(_.hasUser)
        .filterNot(_.isAi)
        .map { Pov(game, _) }

  protected lazy val theftResponse = Unauthorized(
    jsonError("This game requires authentication")
  ).as(JSON)
