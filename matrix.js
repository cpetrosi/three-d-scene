window.Matrix = (function () {
    let defaultMatrix = function (elements) {
        this.elements = elements ||
            [
                [ 1, 0, 0, 0 ],
                [ 0, 1, 0, 0 ],
                [ 0, 0, 1, 0 ],
                [ 0, 0, 0, 1 ]
            ];
    };

    defaultMatrix.prototype.multiply = function(m) {
        let answer = new defaultMatrix();

        for (let i = 0; i < this.elements.length; i++) {
            let matrix = this.elements[i];
            for (let j = 0; j < matrix.length; j++) {
                let sum = 0;
                for (let k = 0; k < this.elements.length; k++) {
                    sum += m.elements[k][j] * this.elements[i][k];
                }
                answer.elements[i][j] = sum;
            }
        }
        return answer;
    };

    defaultMatrix.translation = function(tx, ty, tz) {
        tx = tx || 0;
        ty = ty || 0;
        tz = tz || 0;

        return new defaultMatrix([
            [ 1, 0, 0, tx ],
            [ 0, 1, 0, ty ],
            [ 0, 0, 1, tz ],
            [ 0, 0, 0, 1 ]
        ]);
    };

    defaultMatrix.scaling = function(sx, sy, sz) {
        sx = sx || 1;
        sy = sy || 1;
        sz = sz || 1;

        return new defaultMatrix([
            [ sx, 0, 0, 0 ],
            [ 0, sy, 0, 0 ],
            [ 0, 0, sz, 0 ],
            [ 0, 0, 0, 1 ]
        ]);
    };

    defaultMatrix.rotationMatrix = function(angle, x, y, z) {
        // In production code, this function should be associated
        // with a matrix object with associated functions.
        let axisLength = Math.sqrt(x * x + y * y + z * z);
        let s = Math.sin(angle * Math.PI / 180.0);
        let c = Math.cos(angle * Math.PI / 180.0);
        let oneMinusC = 1.0 - c;

        // Normalize the axis vector of rotation.
        x /= axisLength;
        y /= axisLength;
        z /= axisLength;

        // Now we can calculate the other terms.
        // "2" for "squared."
        let x2 = x * x;
        let y2 = y * y;
        let z2 = z * z;
        let xy = x * y;
        let yz = y * z;
        let xz = x * z;
        let xs = x * s;
        let ys = y * s;
        let zs = z * s;

        // GL expects its matrices in column major order.
        return new defaultMatrix([
            [
                x2 * oneMinusC + c,
                xy * oneMinusC + zs,
                xz * oneMinusC - ys,
                0.0
            ],

            [
                xy * oneMinusC - zs,
                y2 * oneMinusC + c,
                yz * oneMinusC + xs,
                0.0
            ],

            [
                xz * oneMinusC + ys,
                yz * oneMinusC - xs,
                z2 * oneMinusC + c,
                0.0
            ],

            [
                0.0,
                0.0,
                0.0,
                1.0
            ]
        ]);
    };

    defaultMatrix.orthoMatrix = function(left, right, bottom, top, zNear, zFar) {
        let width = right - left;
        let height = top - bottom;
        let depth = zFar - zNear;

        return new defaultMatrix([
            [
                2.0 / width,
                0.0,
                0.0,
                -(right + left) / width
            ],

            [
                0.0,
                2.0 / height,
                0.0,
                -(top + bottom) / height
            ],

            [
                0.0,
                0.0,
                -2.0 / depth,
                -(zFar + zNear) / depth
            ],

            [
                0.0,
                0.0,
                0.0,
                1.0
            ]
        ]);
    };

    defaultMatrix.perspectiveMatrix = function(left, right, bottom, top, zNear, zFar) {
        let width = right - left;
        let height = top - bottom;
        let depth = zFar - zNear;

        return new defaultMatrix([
            [
                2.0 * zNear / width,
                0.0,
                (right + left) / width,
                0.0
            ],

            [
                0.0,
                2.0 * zNear / height,
                (top + bottom) / height,
                0.0
            ],

            [
                0.0,
                0.0,
                -(zFar + zNear) / depth,
                -(2.0 * zNear * zFar) / depth
            ],

            [
                0.0,
                0.0,
                -1.0,
                0.0
            ]
        ]);
    };

    defaultMatrix.prototype.convertToWebGl = function () {
        let answer = [];
        for (let i = 0; i < this.elements.length; i++) {
            for (let j = 0; j < this.elements.length; j++) {
                answer.push(this.elements[j][i]);
            }
        }
        return answer;
    };

    defaultMatrix.camera = function (px, py, pz, qx, qy, qz, ux, uy, uz) {
        let centerOfProj = new window.Vector(px, py, pz);
        let eyePoint = new window.Vector(qx, qy, qz);
        let upVector = new window.Vector(ux, uy, uz);

        let newZ = centerOfProj.subtract(eyePoint).unit;
        let newY = upVector.subtract(upVector.projection(newZ)).unit;
        let newX = newY.cross(newZ);

        let projectionX = -centerOfProj.dot(newX);
        let projectionY = -centerOfProj.dot(newY);
        let projectionZ = -centerOfProj.dot(newZ);

        return new defaultMatrix([
            [newX.x, newX.y, newX.z, projectionX],
            [newY.x, newY.y, newY.z, projectionY],
            [newZ.x, newZ.y, newZ.z, projectionZ],
            [0, 0, 0, 1]
        ]);
    };

    return defaultMatrix;
})();
