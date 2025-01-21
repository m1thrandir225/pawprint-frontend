export abstract class Config {
  public static environment: 'development' | 'production' = 'development'

  public static get baseURL(): string {
    switch (this.environment) {
      case 'production':
        return ''
      case 'development':
        return 'http://localhost:5131'
    }
  }

  public static apiURL: string = this.baseURL + '/api'

  public static publicFilesURL: string = this.baseURL + '/public/'

  public static uploadFilesURL: string = this.baseURL + '/uploads/'
}
