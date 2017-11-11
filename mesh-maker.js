/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
 /* global Vector */
(() => {
    class Mesh {
        constructor(
            choices = {
                vertices: [],
                indicies: []
            }
        ) {
            this.vertices = choices.vertices;
            this.indices = choices.indices;
        }

        /*
         * Utility function for turning indexed vertices into a "raw" coordinate array
         * arranged as triangles.
         */
        toRawTriangleArray() {
            let result = [];

            for (let i = 0, maxi = this.indices.length; i < maxi; i += 1) {
                for (let j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
                    result = result.concat(
                        this.vertices[
                            this.indices[i][j]
                        ]
                    );
                }
            }

            return result;
        }

        /*
         * Utility function for turning indexed vertices into a "raw" coordinate array
         * arranged as line segments.
         */
        toRawLineArray() {
            let result = [];

            for (let i = 0, maxi = this.indices.length; i < maxi; i += 1) {
                for (let j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
                    result = result.concat(
                        this.vertices[
                            this.indices[i][j]
                        ],

                        this.vertices[
                            this.indices[i][(j + 1) % maxj]
                        ]
                    );
                }
            }

            return result;
        }

        toNormalArray() {
            let result = [];

            // For each face...
            for (let i = 0, maxi = this.indices.length; i < maxi; i += 1) {
                // We form vectors from the first and second then second and third vertices.
                let p0 = this.vertices[this.indices[i][0]];
                let p1 = this.vertices[this.indices[i][1]];
                let p2 = this.vertices[this.indices[i][2]];

                // Technically, the first value is not a vector, but v can stand for vertex
                // anyway, so...
                let v0 = new Vector(p0[0], p0[1], p0[2]);
                let v1 = new Vector(p1[0], p1[1], p1[2]).subtract(v0);
                let v2 = new Vector(p2[0], p2[1], p2[2]).subtract(v0);
                let normal = v1.cross(v2).unit;

                // We then use this same normal for every vertex in this face.
                for (let j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
                    result = result.concat(
                        [ normal.x, normal.y, normal.z ]
                    );
                }
            }

            return result;
        }

        toVertexNormalArray() {
            let result = [];

            // For each face...
            for (let i = 0, maxi = this.indices.length; i < maxi; i += 1) {
                // For each vertex in that face...
                for (let j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
                    let p = this.vertices[this.indices[i][j]];
                    let normal = new Vector(p[0], p[1], p[2]).unit;
                    result = result.concat(
                        [ normal.x, normal.y, normal.z ]
                    );
                }
            }

            return result;
        }

    }

    class icosahedron extends Mesh {
        constructor() {
            super({});
            const X = 0.525731112119133606;
            const Z = 0.850650808352039932;
            this.vertices = [];
            this.indices = [];

            this.vertices = [
                [ -X, 0.0, Z ],
                [ X, 0.0, Z ],
                [ -X, 0.0, -Z ],
                [ X, 0.0, -Z ],
                [ 0.0, Z, X ],
                [ 0.0, Z, -X ],
                [ 0.0, -Z, X ],
                [ 0.0, -Z, -X ],
                [ Z, X, 0.0 ],
                [ -Z, X, 0.0 ],
                [ Z, -X, 0.0 ],
                [ -Z, -X, 0.0 ]
            ],

            this.indices = [
                [ 1, 4, 0 ],
                [ 4, 9, 0 ],
                [ 4, 5, 9 ],
                [ 8, 5, 4 ],
                [ 1, 8, 4 ],
                [ 1, 10, 8 ],
                [ 10, 3, 8 ],
                [ 8, 3, 5 ],
                [ 3, 2, 5 ],
                [ 3, 7, 2 ],
                [ 3, 10, 7 ],
                [ 10, 6, 7 ],
                [ 6, 11, 7 ],
                [ 6, 0, 11 ],
                [ 6, 1, 0 ],
                [ 10, 1, 6 ],
                [ 11, 0, 9 ],
                [ 2, 11, 9 ],
                [ 5, 2, 9 ],
                [ 11, 2, 7 ]
            ];
        }
    }
    Mesh.icosahedron = icosahedron;

    class cube extends Mesh {
        constructor() {
            super({});
            const X = 0.5;
            const Y = 0.5;
            const Z = 0.5;
            this.vertices = [];
            this.indices = [];

            this.vertices = [
                [-X, Y, -Z],
                [-X, -Y, -Z],
                [X, Y, -Z],
                [X, -Y, -Z],
                [X, -Y, Z],
                [X, Y, Z],
                [-X, Y, Z],
                [-X, -Y, Z]
            ],

            this.indices = [
                [0, 1, 2],
                [1, 3, 2],
                [3, 4, 2],
                [4, 5, 2],
                [4, 7, 5],
                [7, 6, 5],
                [7, 1, 0],
                [7, 0, 6],
                [0, 2, 6],
                [6, 2, 5],
                [1, 4, 7],
                [1, 3, 4]
            ];
        }
    }
    Mesh.cube = cube;

    class pyramid extends Mesh {
        constructor() {
            super({});
            const X = 0.5;
            const Y = 0.5;
            const Z = 0.5;
            this.vertices = [];
            this.indices = [];

            this.vertices = [
                [-X, -Y, -Z],
                [-X, -Y, Z],
                [X, -Y, Z],
                [X, -Y, -Z],
                [X, Y, Z]
            ],

            this.indices = [
                [0, 3, 4],
                [0, 1, 2],
                [0, 1, 4],
                [1, 2, 4],
                [2, 3, 0],
                [2, 3, 4]
            ];
        }
    }
    Mesh.pyramid = pyramid;

    class sphere extends Mesh {
        constructor() {
            super({});
            let radius = 0.9;
            let longLines = 40;
            let latLines = 40;
            this.vertices = [];
            this.indices = [];

            for (let currLongitute = 0; currLongitute <= longLines; currLongitute++) {
                let phi = currLongitute * 2 * Math.PI / longLines;
                let cosOfPhi = Math.cos(phi);
                let sinOfPhi = Math.sin(phi);

                for (let currLatitude = 0; currLatitude <= latLines; currLatitude++) {
                    let theta = currLatitude * Math.PI / latLines;
                    let cosOfTheta = Math.cos(theta);
                    let sinOfTheta = Math.sin(theta);

                    let x = cosOfPhi * sinOfTheta;
                    let y = cosOfTheta;
                    let z = sinOfPhi * sinOfTheta;

                    this.vertices.push([ radius * x, radius * y, radius * z ]);

                    let top = currLatitude * (longLines + 1) + currLongitute;
                    let bottom = top + longLines + 1;

                    if (currLatitude !== latLines && currLongitute !== longLines) {
                        this.indices.push([ top + 1, bottom, top ]);
                        this.indices.push([ top + 1, bottom + 1, bottom ]);
                    }
                }
            }
        }
    }
    Mesh.sphere = sphere;

    // let toRawTriangleArray = Mesh.toRawTriangleArray;
    // let toRawLineArray = Mesh.toRawLineArray;

    window.Mesh = Mesh;
})();
