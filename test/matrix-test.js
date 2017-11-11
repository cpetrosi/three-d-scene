describe("Matrix library", () => {
    let Matrix = window.Matrix;
    it("should create the identity matrix", () => {
        let matrix = new Matrix();
        expect(matrix.elements).toEqual(
            [
                [ 1, 0, 0, 0 ],
                [ 0, 1, 0, 0 ],
                [ 0, 0, 1, 0 ],
                [ 0, 0, 0, 1 ]
            ]
        );
    });

    it("should create a random matrix", () => {
        let matrix = new Matrix(
            [
                [ 0, 0, 0, 0 ],
                [ 1, 1, 1, 1 ],
                [ 2, 2, 2, 2 ],
                [ 3, 3, 3, 3 ]
            ]
        );
        expect(matrix.elements).toEqual(
            [
                [ 0, 0, 0, 0 ],
                [ 1, 1, 1, 1 ],
                [ 2, 2, 2, 2 ],
                [ 3, 3, 3, 3 ]
            ]
        );
    });

    it("should be able to multiply a matrix with the identity matrix", () => {
        let matrix = new Matrix(
            [
                [ 1, 2, 3, 4 ],
                [ 5, 6, 7, 8 ],
                [ 1, 2, 3, 4 ],
                [ 5, 6, 7, 8 ]
            ]
        );
        let matrix2 = new Matrix();
        let answer = matrix.multiply(matrix2);
        expect(answer.elements).toEqual(
            [
                [ 1, 2, 3, 4 ],
                [ 5, 6, 7, 8 ],
                [ 1, 2, 3, 4 ],
                [ 5, 6, 7, 8 ]
            ]
        );
    });

    it("should be able to multiply two matrices together", () => {
        let matrix1 = new Matrix(
            [
                [ 0, 1, 2, 3 ],
                [ 4, 5, 6, 7 ],
                [ 0, 1, 2, 3 ],
                [ 4, 5, 6, 7 ]
            ]
        );
        let matrix2 = new Matrix(
            [
                [ 5, 6, 7, 8 ],
                [ 1, 2, 3, 4 ],
                [ 5, 6, 7, 8 ],
                [ 1, 2, 3, 4 ]
            ]
        );
        let answer = matrix1.multiply(matrix2);
        expect(answer.elements).toEqual(
            [
                [ 14, 20, 26, 32 ],
                [ 62, 84, 106, 128 ],
                [ 14, 20, 26, 32 ],
                [ 62, 84, 106, 128 ]
            ]
        );
    });

    it("should create the translation matrix", () => {
        let matrix = Matrix.translation(2, 4, 6);
        expect(matrix.elements).toEqual(
            [
                [ 1, 0, 0, 2 ],
                [ 0, 1, 0, 4 ],
                [ 0, 0, 1, 6 ],
                [ 0, 0, 0, 1 ]
            ]
        );
    });

    it("should return identity matrix if no argument is provided", () => {
        let matrix = Matrix.translation();
        expect(matrix.elements).toEqual(
            [
                [ 1, 0, 0, 0 ],
                [ 0, 1, 0, 0 ],
                [ 0, 0, 1, 0 ],
                [ 0, 0, 0, 1 ]
            ]
        );
    });

    it("should create translation matrix with less arguments", () => {
        let matrix = Matrix.translation(2);
        expect(matrix.elements).toEqual(
            [
                [ 1, 0, 0, 2 ],
                [ 0, 1, 0, 0 ],
                [ 0, 0, 1, 0 ],
                [ 0, 0, 0, 1 ]
            ]
        );
    });

    it("should create translation matrix with less arguments", () => {
        let matrix = Matrix.translation(2, 4);
        expect(matrix.elements).toEqual(
            [
                [ 1, 0, 0, 2 ],
                [ 0, 1, 0, 4 ],
                [ 0, 0, 1, 0 ],
                [ 0, 0, 0, 1 ]
            ]
        );
    });

    it("should create the scaling matrix", () => {
        let matrix = Matrix.scaling(1, 2, 3);
        expect(matrix.elements).toEqual(
            [
                [ 1, 0, 0, 0 ],
                [ 0, 2, 0, 0 ],
                [ 0, 0, 3, 0 ],
                [ 0, 0, 0, 1 ]
            ]
        );
    });

    it("should return identity matrix if no argument is provided", () => {
        let matrix = Matrix.scaling();
        expect(matrix.elements).toEqual(
            [
                [ 1, 0, 0, 0 ],
                [ 0, 1, 0, 0 ],
                [ 0, 0, 1, 0 ],
                [ 0, 0, 0, 1 ]
            ]
        );
    });

    it("should create scaling matrix with less arguments", () => {
        let matrix = Matrix.scaling(1);
        expect(matrix.elements).toEqual(
            [
                [ 1, 0, 0, 0 ],
                [ 0, 1, 0, 0 ],
                [ 0, 0, 1, 0 ],
                [ 0, 0, 0, 1 ]
            ]
        );
    });

    it("should create scaling matrix with less arguments", () => {
        let matrix = Matrix.scaling(1, 2);
        expect(matrix.elements).toEqual(
            [
                [ 1, 0, 0, 0 ],
                [ 0, 2, 0, 0 ],
                [ 0, 0, 1, 0 ],
                [ 0, 0, 0, 1 ]
            ]
        );
    });

    it("should create the rotation matrix when x = 1", () => {
        let matrix = Matrix.rotationMatrix(0, 1, 0, 0);
        expect(matrix.elements).toEqual(
            [
                [ 1, 0, 0, 0 ],
                [ 0, 1, 0, 0 ],
                [ 0, 0, 1, 0 ],
                [ 0, 0, 0, 1 ]
            ]
        );
    });

    it("should create the rotation matrix when y = 1", () => {
        let matrix = Matrix.rotationMatrix(0, 0, 1, 0);
        expect(matrix.elements).toEqual(
            [
                [ 1, 0, 0, 0 ],
                [ 0, 1, 0, 0 ],
                [ 0, 0, 1, 0 ],
                [ 0, 0, 0, 1 ]
            ]
        );
    });

    it("should create the rotation matrix when z = 1", () => {
        let matrix = Matrix.rotationMatrix(0, 0, 0, 1);
        expect(matrix.elements).toEqual(
            [
                [ 1, 0, 0, 0 ],
                [ 0, 1, 0, 0 ],
                [ 0, 0, 1, 0 ],
                [ 0, 0, 0, 1 ]
            ]
        );
    });

    it("should create the orthogonal matrix", () => {
        let matrix = Matrix.orthoMatrix(5, 7, 5, 7, 3, 4);
        expect(matrix.elements).toEqual(
            [
                [ 2 / 2, 0, 0, -(12 / 2)],
                [ 0, 2 / 2, 0, -(12 / 2)],
                [ 0, 0, -(2 / 1), -(7 / 1)],
                [ 0, 0, 0, 1]
            ]
        );
    });

    it("should create the perspective matrix", () => {
        let matrix = Matrix.perspectiveMatrix(5, 7, 5, 7, 3, 4);
        expect(matrix.elements).toEqual(
            [
                [ 2 * 3 / 2, 0, 12 / 2, 0],
                [ 0, 2 * 3 / 2, 12 / 2, 0],
                [ 0, 0, -(7 / 1), -(2 * 3 * 4 / 1)],
                [ 0, 0, -1, 0]
            ]
        );
    });

    it("successfully creates a matrix ready for WebGL", () => {
        var matrix = new Matrix(
            [
                [ 1, 2, 3, 4 ],
                [ 5, 6, 7, 8 ],
                [ 1, 2, 3, 4 ],
                [ 5, 6, 7, 8 ]
            ]
        );
        expect(matrix.convertToWebGl()).toEqual(
            [
                1, 5, 1, 5,
                2, 6, 2, 6,
                3, 7, 3, 7,
                4, 8, 4, 8
            ]
        );
    });
});
