const axios = require("axios");

const url = "http://13.53.235.38/users";

describe("GET /users", () => {
  it("should return all users", async () => {
    const res = await axios.get(url);
    expect(res).toBeTruthy();
    expect(res.status).toEqual(200);
    expect(res.data.length).toBeGreaterThan(0);
  });
});

describe("GET /users/filter/:spent", () => {
  it("should return all users with spent amount greater than :spent", async () => {
    const res = await axios.get(`${url}/filter/100`);
    expect(res).toBeTruthy();
    expect(res.status).toEqual(200);
    expect(res.data.length).toBeGreaterThan(0);
    for (let user of res.data) {
      expect(user.spentShopping).toBeGreaterThan(100);
    }
  });
});

describe('GET /users/statistic', () => {
    it('should return the users ordered by average spent amount', async () => {
        const res = await axios.get(`${url}/statistic`);
        expect(res).toBeTruthy();
        expect(res.status).toEqual(200);
        expect(res.data.length).toBeGreaterThan(0);
        for (let i = 0; i < res.data.length - 2; i++) {
            expect(res.data[i].avgTransaction).toBeGreaterThanOrEqual(res.data[i + 1].avgTransaction);
        }
    });
}
)
