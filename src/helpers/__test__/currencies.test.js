import { getCurrenciesList } from "../currencies";

test("get correct number of currency list", () => {
  const list = getCurrenciesList(3);
  expect(list).toHaveLength(3);
});
