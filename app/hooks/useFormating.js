import i18n from "../languages/i18n";

const useFormating = () => {
  const formatingStatsName = (stat) => {
    let statsMap = {
      hp: i18n.t("detail.hp"),
      attack: i18n.t("detail.attack"),
      defense: i18n.t("detail.defense"),
      "special-attack": i18n.t("detail.spatk"),
      "special-defense": i18n.t("detail.spdef"),
      speed: i18n.t("detail.speed"),
    };
    return statsMap[stat];
  };

  return { formatingStatsName };
};

export default useFormating;
