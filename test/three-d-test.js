describe("ThreeD object and Mesh implementation", () => {
    fixture.setBase("test");
    fixture.load("fixture.html");

    let canvas = document.getElementById("hello-webgl");

    let ThreeD = window.ThreeD;
    let Mesh = window.Mesh;
    let GLSLUtilities = window.GLSLUtilities;

    describe("constructor", () => {
        it("should successfully create a cube", () => {
            let cube = new Mesh.cube();
            let cubeV = cube.toRawLineArray();
            let cubeC = { r: 1.0, g: 0.0, b: 0.0 };
            let cubeM = GLSLUtilities.getGL(canvas).LINES;
            let newCube = new ThreeD(cubeV, cubeC, cubeM);
            expect(newCube).toEqual(
                new ThreeD(
                    cube.toRawLineArray(), { r: 1.0, g: 0.0, b: 0.0 }, GLSLUtilities.getGL(canvas).LINES
                )
            );

            newCube.scale({ sx: 2.0, sy: 2.0, sz: 2.0 });

            expect(newCube.scaleMatrix).toEqual(new window.Matrix([
                [2, 0, 0, 0],
                [0, 2, 0, 0],
                [0, 0, 2, 0],
                [0, 0, 0, 1]
            ]));

            newCube.translate({ tx: 1.0, ty: 1.0, tz: 1.0 });

            expect(newCube.translateMatrix).toEqual(new window.Matrix([
                [1, 0, 0, 1],
                [0, 1, 0, 1],
                [0, 0, 1, 1],
                [0, 0, 0, 1],
            ]));

            let X = 0.5;
            let Y = 0.5;
            let Z = 0.5;

            expect(cube.vertices).toEqual([
                [-X, Y, -Z],
                [-X, -Y, -Z],
                [X, Y, -Z],
                [X, -Y, -Z],
                [X, -Y, Z],
                [X, Y, Z],
                [-X, Y, Z],
                [-X, -Y, Z]
            ]);

            expect(cube.indices).toEqual([
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
            ]);
        });

        it("should successfully create a pyramid", () => {
            let pyramid = new Mesh.pyramid();
            let pyramidV = pyramid.toRawLineArray();
            let pyramidC = { r: 0.0, g: 0.0, b: 1.0 };
            let pyramidM = GLSLUtilities.getGL(canvas).LINES;
            let newPyramid = new ThreeD(pyramidV, pyramidC, pyramidM);

            expect(newPyramid).toEqual(
                new ThreeD(
                    pyramid.toRawLineArray(), { r: 0.0, g: 0.0, b: 1.0 }, GLSLUtilities.getGL(canvas).LINES
                )
            );

            let X = 0.5;
            let Y = 0.5;
            let Z = 0.5;

            expect(pyramid.vertices).toEqual([
                [-X, -Y, -Z],
                [-X, -Y, Z],
                [X, -Y, Z],
                [X, -Y, -Z],
                [X, Y, Z]
            ]);

            expect(pyramid.indices).toEqual([
                [0, 3, 4],
                [0, 1, 2],
                [0, 1, 4],
                [1, 2, 4],
                [2, 3, 0],
                [2, 3, 4]
            ]);
        });

        it("should successfully create a icosahedron", () => {
            let icosahedron = new Mesh.icosahedron();
            let icoV = icosahedron.toRawLineArray();
            let icoC = { r: 0.0, g: 0.0, b: 1.0 };
            let icoM = GLSLUtilities.getGL(canvas).LINES;
            let newIco = new ThreeD(icoV, icoC, icoM);

            expect(newIco).toEqual(
                new ThreeD(
                    icosahedron.toRawLineArray(), { r: 0.0, g: 0.0, b: 1.0 }, GLSLUtilities.getGL(canvas).LINES
                )
            );

            const X = 0.525731112119133606;
            const Z = 0.850650808352039932;

            expect(icosahedron.vertices).toEqual([
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
            ]);

            expect(icosahedron.indices).toEqual([
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
            ]);
        });

        it("should successfully create a sphere", () => {
            let sphere = new Mesh.sphere();
            let sphereV = sphere.toRawLineArray();
            let sphereC = { r: 0.0, g: 1.0, b: 0.0 };
            let sphereM = GLSLUtilities.getGL(canvas).LINES;
            let newSphere = new ThreeD(sphereV, sphereC, sphereM);

            expect(sphere.vertices).toEqual(new Mesh.sphere().vertices);
            expect(sphere.indices).toEqual(new Mesh.sphere().indices);

            expect(newSphere).toEqual(
                new ThreeD(
                    sphere.toRawLineArray(), { r: 0.0, g: 1.0, b: 0.0 }, GLSLUtilities.getGL(canvas).LINES
                )
            );
        });

    });

    describe("creation of children", () => {
        it("should be 0 when no child is added", () => {
            let cube = new Mesh.cube();
            let newC = new ThreeD(cube.toRawLineArray(), { r: 0.0, g: 0.0, b: 1.0 }, GLSLUtilities.getGL(canvas).LINES);
            let numberOfChildren = newC.children.length;
            expect(numberOfChildren).toEqual(0);
        });

        it("should be 1 when addChild is executed", () => {
            let cube = new Mesh.cube();
            let pyramid = new Mesh.pyramid();
            let newC = new ThreeD(cube.toRawLineArray(), { r: 0.0, g: 0.0, b: 1.0 }, GLSLUtilities.getGL(canvas).LINES);
            let numberOfChildren;
            newC.addChild(new ThreeD(pyramid.toRawLineArray(), { r: 1.0, g: 0.0, b: 0.0 }, GLSLUtilities.getGL(canvas).LINES));
            numberOfChildren = newC.children.length;
            expect(numberOfChildren).toEqual(1);
        });
    });
});
