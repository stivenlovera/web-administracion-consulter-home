export interface IResponseTest {
    status: number;
    message: string;
    data: {
        tests: ITest[]
    }
}
export interface ITest {
    test_id: number;
    nombreTest: string;
}
export interface IResponseInsertTest {
    status: number;
    message: string;
    data: null
}
export interface IResponseEditarTest {
    status: number;
    message: string;
    data: {
        test: ITest
    }
}
export interface IResponseUpdateTest {
    status: number;
    message: string;
    data: null
}
export interface IResponseDeleteTest {
    status: number;
    message: string;
    data: null
}