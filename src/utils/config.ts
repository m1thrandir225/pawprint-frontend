export abstract class Config {
  public static environment: 'development' | 'production' = import.meta.env.VITE_APP_ENVIROMENT

  public static get baseURL(): string {
    return import.meta.env.VITE_BACKEND_URL
  }

  public static apiURL: string = this.baseURL + '/api'

  public static publicFilesURL: string = this.baseURL + '/public/'

  public static uploadFilesURL: string = this.baseURL + '/uploads/'
}
