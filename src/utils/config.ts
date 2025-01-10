export abstract class Config {
  public static environment: "development" | "production" = "development";

  public static get baseURL(): string {
    switch (this.environment) {
      case "production": return ""
      case "development": return "http://localhost:8000"
    }
  }

  public static apiURL: string = this.baseURL + "/api/v1";

  public static publicFilesURL: string = this.baseURL + "/public/";

}
