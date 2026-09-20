/*:
 * @target MZ
 * @plugindesc Opens the guardian form.
 *
 * @command openForm
 * @text Open Guardian Form
 *
 * @arg url
 * @type string
 * @default https://docs.google.com/forms/d/e/1FAIpQLSeLQDkvYHOHolc2v93UQbnC_mGtwstnSfp9y1Zhhur5eZR29g/viewform?usp=sharing&ouid=107835637981268863450
 */

(() => {
  const PLUGIN_NAME = "KUCIS_EndingCredits";
  const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeLQDkvYHOHolc2v93UQbnC_mGtwstnSfp9y1Zhhur5eZR29g/viewform?usp=sharing&ouid=107835637981268863450";

  PluginManager.registerCommand(PLUGIN_NAME, "openForm", function(args) {
    const url = args.url || FORM_URL;
    window.open(url, "_blank", "noopener");
  });
})();
