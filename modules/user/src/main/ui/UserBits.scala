package lila.user
package ui

import lila.ui.*

import ScalatagsTemplate.{ *, given }
import lila.core.relation.Relation

final class UserBits(helpers: Helpers):
  import helpers.*

  def communityMenu(active: String)(using Translate) =
    lila.ui.bits.pageMenuSubnav(
      a(cls := active.active("leaderboard"), href := routes.User.list)(trans.site.leaderboard()),
      a(
        cls := active.active("ratings"),
        href := routes.User.ratingDistribution(PerfKey.blitz)
      )(
        trans.site.ratingStats()
      ),
      a(cls := active.active("tournament"), href := routes.Tournament.leaderboard)(
        trans.arena.tournamentWinners()
      ),
      a(cls := active.active("shield"), href := routes.Tournament.shields)(
        trans.arena.tournamentShields()
      ),
      a(href := routes.Fide.index())(
        "FIDE players"
      ),
      div(cls := "sep"),
      a(cls := active.active("bots"), href := routes.PlayApi.botOnline)(
        trans.site.onlineBots()
      )
    )

  def miniClosed(u: User, relation: Option[Relation])(using Translate) = Snippet:
    frag(
      div(cls := "title")(userLink(u, withPowerTip = false)),
      div(style := "padding: 20px 8px; text-align: center")(trans.settings.thisAccountIsClosed()),
      relation
        .exists(!_.isFollow)
        .option(
          a(
            cls := "btn-rack__btn relation-button text aclose",
            title := trans.site.unblock.txt(),
            href := s"${routes.Relation.unblock(u.id)}?mini=1",
            dataIcon := Icon.NotAllowed
          )(trans.site.blocked())
        ),
      relation
        .exists(_.isFollow)
        .option(
          a(
            cls := "btn-rack__btn relation-button text aclose",
            title := trans.site.unfollow.txt(),
            href := s"${routes.Relation.unfollow(u.id)}?mini=1",
            dataIcon := Icon.ThumbsUp
          )(trans.site.following())
        )
    )

  def signalBars(v: Int) = raw:
    val bars = (1 to 4)
      .map: b =>
        s"""<i${if v < b then " class=\"off\"" else ""}></i>"""
      .mkString("")
    val title = v match
      case 1 => "Poor connection"
      case 2 => "Decent connection"
      case 3 => "Good connection"
      case _ => "Excellent connection"
    s"""<signal title="$title" class="q$v">$bars</signal>"""

  def perfTrophies(u: User, rankMap: lila.rating.UserRankMap)(using Translate) = (!u.lame).so:
    rankMap.toList
      .sortBy(_._2)
      .map: (perf, rank) =>
        lila.rating.PerfType(perf) -> rank
      .collect:
        case (perf, rank) if rank == 1 =>
          span(cls := "trophy perf top1", title := s"${perf.trans} Champion!")(
            img(src := assetUrl("images/trophy/gold-cup-2.png"))
          )
        case (perf, rank) if rank <= 10 =>
          span(cls := "trophy perf top10", title := s"${perf.trans} Top 10!")(
            img(src := assetUrl("images/trophy/silver-cup-2.png"))
          )
        case (perf, rank) if rank <= 50 =>
          span(cls := "trophy perf top50", title := s"${perf.trans} Top 50 player!")(
            img(src := assetUrl("images/trophy/Fancy-Gold.png"))
          )
        case (perf, rank) if rank <= 100 =>
          span(cls := "trophy perf", title := s"${perf.trans} Top 100 player!")(
            img(src := assetUrl("images/trophy/Gold-Cup.png"))
          )

  object awards:
    def awardCls(t: Trophy) = cls := s"trophy award ${t.kind._id} ${~t.kind.klass}"

    def zugMiracleTrophy(t: Trophy) = frag(
      styleTag("""
  .trophy.zugMiracle {
    display: flex;
    align-items: flex-end;
    height: 40px;
    margin: 0 8px!important;
    transition: 2s;
  }
  .trophy.zugMiracle img { height: 60px; }
  @keyframes psyche { 100% { filter: hue-rotate(360deg); } }
  .trophy.zugMiracle:hover {
    transform: translateY(-9px);
    animation: psyche 0.3s ease-in-out infinite alternate;
  }"""),
      a(awardCls(t), href := t.anyUrl, ariaTitle(t.kind.name))(
        img(src := assetUrl("images/trophy/zug-trophy.png"))
      )
    )
