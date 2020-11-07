import i18n from "../languages/i18n";
import useFormating from "../hooks/useFormating";

describe("Formating stats to correct language", () => {
  it("return 'speed' when language is 'en'", () => {
    const { formatingStatsName } = useFormating();
    i18n.locale = "en";
    expect(formatingStatsName("speed")).toBe("Speed");
  });
  it("return 'velocidad' when language is 'es'", () => {
    const { formatingStatsName } = useFormating();
    i18n.locale = "es";
    expect(formatingStatsName("speed")).toBe("Velocidad");
  });
  it("return 'Defensa Ep' when language is 'es'", () => {
    const { formatingStatsName } = useFormating();
    i18n.locale = "es";
    expect(formatingStatsName("special-defense")).toBe("Defensa Ep");
  });
  it("NOT return 'Defensa Ep' when language is 'en'", () => {
    const { formatingStatsName } = useFormating();
    i18n.locale = "en";
    expect(formatingStatsName("special-defense")).not.toBe("Defensa Ep");
  });
});
