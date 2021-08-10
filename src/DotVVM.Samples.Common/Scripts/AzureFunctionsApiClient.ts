namespace AzureFunctionsApi {
    /* tslint:disable */
    //----------------------
    // <auto-generated>
    //     Generated using the NSwag toolchain v11.3.3.0 (NJsonSchema v9.4.2.0) (http://NSwag.org)
    // </auto-generated>
    //----------------------
    // ReSharper disable InconsistentNaming
    
    
    export class Client {
        private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
        private baseUrl: string;
        protected jsonParseReviver: (key: string, value: any) => any = undefined;
    
        constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
            this.http = http ? http : <any>window;
            this.baseUrl = baseUrl ? baseUrl : "https://dotvvmazurefunctionstest.azurewebsites.net";
        }
    
        /**
         * @return Success operation
         */
        _api_AddTableEntity_post(data: CreateFormModel): Promise<void> {
            let url_ = this.baseUrl + "/api/AddTableEntity";
            url_ = url_.replace(/[?&]$/, "");
    
            const content_ = JSON.stringify(data);
    
            let options_ = <RequestInit>{
                body: content_,
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                }
            };
    
            return this.http.fetch(url_, options_).then((_response: Response) => {
                return this.process_api_AddTableEntity_post(_response);
            });
        }
    
        protected process_api_AddTableEntity_post(response: Response): Promise<void> {
            const status = response.status;
            if (status === 204) {
                return response.text().then((_responseText) => {
                return;
                });
            } else if (status !== 200 && status !== 204) {
                return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText);
                });
            }
            return Promise.resolve<void>(<any>null);
        }
    
        /**
         * @return Success operation
         */
        _api_DeleteEntities_delete(): Promise<void> {
            let url_ = this.baseUrl + "/api/DeleteEntities";
            url_ = url_.replace(/[?&]$/, "");
    
            let options_ = <RequestInit>{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json", 
                }
            };
    
            return this.http.fetch(url_, options_).then((_response: Response) => {
                return this.process_api_DeleteEntities_delete(_response);
            });
        }
    
        protected process_api_DeleteEntities_delete(response: Response): Promise<void> {
            const status = response.status;
            if (status === 204) {
                return response.text().then((_responseText) => {
                return;
                });
            } else if (status !== 200 && status !== 204) {
                return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText);
                });
            }
            return Promise.resolve<void>(<any>null);
        }
    
        /**
         * @return Success operation
         */
        _api_GetTable_get(): Promise<FormModel[]> {
            let url_ = this.baseUrl + "/api/GetTable";
            url_ = url_.replace(/[?&]$/, "");
    
            let options_ = <RequestInit>{
                method: "GET",
                headers: {
                    "Content-Type": "application/json", 
                    "Accept": "application/json"
                }
            };
    
            return this.http.fetch(url_, options_).then((_response: Response) => {
                return this.process_api_GetTable_get(_response);
            });
        }
    
        protected process_api_GetTable_get(response: Response): Promise<FormModel[]> {
            const status = response.status;
            if (status === 200) {
                return response.text().then((_responseText) => {
                let result200: FormModel[] = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(FormModel.fromJS(item));
                }
                return result200;
                });
            } else if (status !== 200 && status !== 204) {
                return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText);
                });
            }
            return Promise.resolve<FormModel[]>(<any>null);
        }
    
        /**
         * @return Success operation
         */
        _api_HttpGet_get(): Promise<DataModel> {
            let url_ = this.baseUrl + "/api/HttpGet";
            url_ = url_.replace(/[?&]$/, "");
    
            let options_ = <RequestInit>{
                method: "GET",
                headers: {
                    "Content-Type": "application/json", 
                    "Accept": "application/json"
                }
            };
    
            return this.http.fetch(url_, options_).then((_response: Response) => {
                return this.process_api_HttpGet_get(_response);
            });
        }
    
        protected process_api_HttpGet_get(response: Response): Promise<DataModel> {
            const status = response.status;
            if (status === 200) {
                return response.text().then((_responseText) => {
                let result200: DataModel = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? DataModel.fromJS(resultData200) : new DataModel();
                return result200;
                });
            } else if (status !== 200 && status !== 204) {
                return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText);
                });
            }
            return Promise.resolve<DataModel>(<any>null);
        }
    
        /**
         * @return Success operation
         */
        _api_HttpGetCountry_get(): Promise<Country> {
            let url_ = this.baseUrl + "/api/HttpGetCountry";
            url_ = url_.replace(/[?&]$/, "");
    
            let options_ = <RequestInit>{
                method: "GET",
                headers: {
                    "Content-Type": "application/json", 
                    "Accept": "application/json"
                }
            };
    
            return this.http.fetch(url_, options_).then((_response: Response) => {
                return this.process_api_HttpGetCountry_get(_response);
            });
        }
    
        protected process_api_HttpGetCountry_get(response: Response): Promise<Country> {
            const status = response.status;
            if (status === 200) {
                return response.text().then((_responseText) => {
                let result200: Country = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? Country.fromJS(resultData200) : new Country();
                return result200;
                });
            } else if (status !== 200 && status !== 204) {
                return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText);
                });
            }
            return Promise.resolve<Country>(<any>null);
        }
    
        /**
         * @return Success operation
         */
        _api_HttpPost_post(data: DataModel): Promise<DataModel> {
            let url_ = this.baseUrl + "/api/HttpPost";
            url_ = url_.replace(/[?&]$/, "");
    
            const content_ = JSON.stringify(data);
    
            let options_ = <RequestInit>{
                body: content_,
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                    "Accept": "application/json"
                }
            };
    
            return this.http.fetch(url_, options_).then((_response: Response) => {
                return this.process_api_HttpPost_post(_response);
            });
        }
    
        protected process_api_HttpPost_post(response: Response): Promise<DataModel> {
            const status = response.status;
            if (status === 200) {
                return response.text().then((_responseText) => {
                let result200: DataModel = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? DataModel.fromJS(resultData200) : new DataModel();
                return result200;
                });
            } else if (status !== 200 && status !== 204) {
                return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText);
                });
            }
            return Promise.resolve<DataModel>(<any>null);
        }
    
        /**
         * @return Success operation
         */
        _api_UpdateTableEntity_post(data: FormModel): Promise<void> {
            let url_ = this.baseUrl + "/api/UpdateTableEntity";
            url_ = url_.replace(/[?&]$/, "");
    
            const content_ = JSON.stringify(data);
    
            let options_ = <RequestInit>{
                body: content_,
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                }
            };
    
            return this.http.fetch(url_, options_).then((_response: Response) => {
                return this.process_api_UpdateTableEntity_post(_response);
            });
        }
    
        protected process_api_UpdateTableEntity_post(response: Response): Promise<void> {
            const status = response.status;
            if (status === 200) {
                return response.text().then((_responseText) => {
                return;
                });
            } else if (status !== 200 && status !== 204) {
                return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText);
                });
            }
            return Promise.resolve<void>(<any>null);
        }
    }
    
    export class CreateFormModel implements ICreateFormModel {
        Text: string;
        Number: number;
        Date: Date;
        ToDelete: boolean;
    
        constructor(data?: ICreateFormModel) {
            if (data) {
                for (var property in data) {
                    if (data.hasOwnProperty(property))
                        (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    
        init(data?: any) {
            if (data) {
                this.Text = data["Text"] !== undefined ? data["Text"] : <any>null;
                this.Number = data["Number"] !== undefined ? data["Number"] : <any>null;
                this.Date = data["Date"] ? new Date(data["Date"].toString()) : <any>null;
                this.ToDelete = data["ToDelete"] !== undefined ? data["ToDelete"] : <any>null;
            }
        }
    
        static fromJS(data: any): CreateFormModel {
            let result = new CreateFormModel();
            result.init(data);
            return result;
        }
    
        toJSON(data?: any) {
            data = typeof data === 'object' ? data : {};
            data["Text"] = this.Text !== undefined ? this.Text : <any>null;
            data["Number"] = this.Number !== undefined ? this.Number : <any>null;
            data["Date"] = this.Date ? this.Date.toISOString() : <any>null;
            data["ToDelete"] = this.ToDelete !== undefined ? this.ToDelete : <any>null;
            return data; 
        }
    }
    
    export interface ICreateFormModel {
        Text: string;
        Number: number;
        Date: Date;
        ToDelete: boolean;
    }
    
    export class FormModel implements IFormModel {
        PartitionsKey?: string;
        RowKey?: string;
        Timestamp?: Date;
        Text: string;
        Number: number;
        Date: Date;
        ToDelete: boolean;
    
        constructor(data?: IFormModel) {
            if (data) {
                for (var property in data) {
                    if (data.hasOwnProperty(property))
                        (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    
        init(data?: any) {
            if (data) {
                this.PartitionsKey = data["PartitionsKey"] !== undefined ? data["PartitionsKey"] : <any>null;
                this.RowKey = data["RowKey"] !== undefined ? data["RowKey"] : <any>null;
                this.Timestamp = data["Timestamp"] ? new Date(data["Timestamp"].toString()) : <any>null;
                this.Text = data["Text"] !== undefined ? data["Text"] : <any>null;
                this.Number = data["Number"] !== undefined ? data["Number"] : <any>null;
                this.Date = data["Date"] ? new Date(data["Date"].toString()) : <any>null;
                this.ToDelete = data["ToDelete"] !== undefined ? data["ToDelete"] : <any>null;
            }
        }
    
        static fromJS(data: any): FormModel {
            let result = new FormModel();
            result.init(data);
            return result;
        }
    
        toJSON(data?: any) {
            data = typeof data === 'object' ? data : {};
            data["PartitionsKey"] = this.PartitionsKey !== undefined ? this.PartitionsKey : <any>null;
            data["RowKey"] = this.RowKey !== undefined ? this.RowKey : <any>null;
            data["Timestamp"] = this.Timestamp ? this.Timestamp.toISOString() : <any>null;
            data["Text"] = this.Text !== undefined ? this.Text : <any>null;
            data["Number"] = this.Number !== undefined ? this.Number : <any>null;
            data["Date"] = this.Date ? this.Date.toISOString() : <any>null;
            data["ToDelete"] = this.ToDelete !== undefined ? this.ToDelete : <any>null;
            return data; 
        }
    }
    
    export interface IFormModel {
        PartitionsKey?: string;
        RowKey?: string;
        Timestamp?: Date;
        Text: string;
        Number: number;
        Date: Date;
        ToDelete: boolean;
    }
    
    export class DataModel implements IDataModel {
        Text: string;
        Number: number;
        Date: Date;
        Bool: boolean;
    
        constructor(data?: IDataModel) {
            if (data) {
                for (var property in data) {
                    if (data.hasOwnProperty(property))
                        (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    
        init(data?: any) {
            if (data) {
                this.Text = data["Text"] !== undefined ? data["Text"] : <any>null;
                this.Number = data["Number"] !== undefined ? data["Number"] : <any>null;
                this.Date = data["Date"] ? new Date(data["Date"].toString()) : <any>null;
                this.Bool = data["Bool"] !== undefined ? data["Bool"] : <any>null;
            }
        }
    
        static fromJS(data: any): DataModel {
            let result = new DataModel();
            result.init(data);
            return result;
        }
    
        toJSON(data?: any) {
            data = typeof data === 'object' ? data : {};
            data["Text"] = this.Text !== undefined ? this.Text : <any>null;
            data["Number"] = this.Number !== undefined ? this.Number : <any>null;
            data["Date"] = this.Date ? this.Date.toISOString() : <any>null;
            data["Bool"] = this.Bool !== undefined ? this.Bool : <any>null;
            return data; 
        }
    }
    
    export interface IDataModel {
        Text: string;
        Number: number;
        Date: Date;
        Bool: boolean;
    }
    
    export class Country implements ICountry {
        Name?: string;
        Regions?: Region[];
    
        constructor(data?: ICountry) {
            if (data) {
                for (var property in data) {
                    if (data.hasOwnProperty(property))
                        (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    
        init(data?: any) {
            if (data) {
                this.Name = data["Name"] !== undefined ? data["Name"] : <any>null;
                if (data["Regions"] && data["Regions"].constructor === Array) {
                    this.Regions = [];
                    for (let item of data["Regions"])
                        this.Regions.push(Region.fromJS(item));
                }
            }
        }
    
        static fromJS(data: any): Country {
            let result = new Country();
            result.init(data);
            return result;
        }
    
        toJSON(data?: any) {
            data = typeof data === 'object' ? data : {};
            data["Name"] = this.Name !== undefined ? this.Name : <any>null;
            if (this.Regions && this.Regions.constructor === Array) {
                data["Regions"] = [];
                for (let item of this.Regions)
                    data["Regions"].push(item.toJSON());
            }
            return data; 
        }
    }
    
    export interface ICountry {
        Name?: string;
        Regions?: Region[];
    }
    
    export class Region implements IRegion {
        Id?: number;
        Name?: string;
    
        constructor(data?: IRegion) {
            if (data) {
                for (var property in data) {
                    if (data.hasOwnProperty(property))
                        (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    
        init(data?: any) {
            if (data) {
                this.Id = data["Id"] !== undefined ? data["Id"] : <any>null;
                this.Name = data["Name"] !== undefined ? data["Name"] : <any>null;
            }
        }
    
        static fromJS(data: any): Region {
            let result = new Region();
            result.init(data);
            return result;
        }
    
        toJSON(data?: any) {
            data = typeof data === 'object' ? data : {};
            data["Id"] = this.Id !== undefined ? this.Id : <any>null;
            data["Name"] = this.Name !== undefined ? this.Name : <any>null;
            return data; 
        }
    }
    
    export interface IRegion {
        Id?: number;
        Name?: string;
    }
    
    export class SwaggerException extends Error {
        message: string;
        status: number; 
        response: string; 
        result: any; 
    
        constructor(message: string, status: number, response: string, result: any) {
            super();
    
            this.message = message;
            this.status = status;
            this.response = response;
            this.result = result;
        }
    }
    
    function throwException(message: string, status: number, response: string, result?: any): any {
        if(result !== null && result !== undefined)
            throw result;
        else
            throw new SwaggerException(message, status, response, null);
    }
}
