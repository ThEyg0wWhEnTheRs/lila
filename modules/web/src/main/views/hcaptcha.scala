package lila.web
package views

import lila.ui.ScalatagsTemplate.*
import lila.core.security.HcaptchaForm

object hcaptcha:

  private val dataSitekey = attr("data-sitekey")

  def script(re: HcaptchaForm[?]) =
    re.enabled.option(raw("""<script src="https://hcaptcha.com/1/api.js" async defer></script>"""))

  def tag(form: HcaptchaForm[?]) =
    div(cls := "h-captcha form-group", dataSitekey := form.config.key)
