interface ResultInterface {
    auth: boolean;
    serviceMessage: string;
    dataResponse?: any;
    setAuth: (auth: boolean) => void;
    setMessage: (msg: string) => void;
    setAll: (newResult: ResultInterface) => void
}

export default ResultInterface