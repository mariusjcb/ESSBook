export class UUID {
  static shared = new UUID();
  public uuid(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      let random = (Math.random() * 16) | 0;
      let value = char === "x" ? random : (random % 4) + 8;
      return value.toString(16);
    });
  }
}
