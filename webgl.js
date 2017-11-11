/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
((canvas, $) => {

    let Mesh = window.Mesh;
    let GLSLUtilities = window.GLSLUtilities;
    let Matrix = window.Matrix;
    let ThreeD = window.ThreeD;
    let Vector = window.Vector;

    // Grab the WebGL rendering context.
    let gl = GLSLUtilities.getGL(canvas);
    if (!gl) {
        alert("No WebGL context found...sorry.");

        // No WebGL, no use going on...
        return;
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // let mode1 = gl.LINES;
    let mode2 = gl.TRIANGLES;

    let sphereA = new Mesh.sphere();
    let sphereVA = sphereA.toRawTriangleArray();
    let sphereCA = { r: 0.545, g: 0.271, b: 0.075 };
    let normalSA = sphereA.toVertexNormalArray();
    let newSphereA = new ThreeD(sphereVA, sphereCA, mode2, normalSA);

    newSphereA.scale({ sx: 0.9, sy: 0.9, sz: 0.9 });
    newSphereA.velocity = new Vector(0, 0, 0);
    newSphereA.acceleration = new Vector(0, -0.0000098, 0);

    let sphereB = new Mesh.sphere();
    let sphereVB = sphereB.toRawTriangleArray();
    let sphereCB = { r: 0.545, g: 0.271, b: 0.075 };
    let normalSB = sphereB.toVertexNormalArray();
    let newSphereB = new ThreeD(sphereVB, sphereCB, mode2, normalSB);

    newSphereB.translate({ tx: 0.7, ty: 0.7, tz: 0.2 });
    newSphereB.scale({ sx: 0.3, sy: 0.3, sz: 0.9 });

    let sphereC = new Mesh.sphere();
    let sphereVC = sphereC.toRawTriangleArray();
    let sphereCC = { r: 0.545, g: 0.271, b: 0.075 };
    let normalSC = sphereC.toVertexNormalArray();
    let newSphereC = new ThreeD(sphereVC, sphereCC, mode2, normalSC);

    newSphereC.translate({ tx: -0.7, ty: 0.7, tz: 0.2 });
    newSphereC.scale({ sx: 0.3, sy: 0.3, sz: 0.9 });

    let sphereD = new Mesh.sphere();
    let sphereVD = sphereD.toRawTriangleArray();
    let sphereCD = { r: 0.0, g: 0.0, b: 0.0 };
    let normalSD = sphereD.toVertexNormalArray();
    let newSphereD = new ThreeD(sphereVD, sphereCD, mode2, normalSD);

    newSphereD.translate({ tx: -0.25, ty: 0.2, tz: 0.2 });
    newSphereD.scale({ sx: 0.1, sy: 0.1, sz: 0.9 });

    let sphereE = new Mesh.sphere();
    let sphereVE = sphereE.toRawTriangleArray();
    let sphereCE = { r: 0.0, g: 0.0, b: 0.0 };
    let normalSE = sphereE.toVertexNormalArray();
    let newSphereE = new ThreeD(sphereVE, sphereCE, mode2, normalSE);

    newSphereE.translate({ tx: 0.25, ty: 0.2, tz: 0.2 });
    newSphereE.scale({ sx: 0.1, sy: 0.1, sz: 0.9 });

    let sphereF = new Mesh.sphere();
    let sphereVF = sphereF.toRawTriangleArray();
    let sphereCF = { r: 0.0, g: 0.0, b: 0.0};
    let normalSF = sphereF.toVertexNormalArray();
    let newSphereF = new ThreeD(sphereVF, sphereCF, mode2, normalSF);

    newSphereF.translate({ tx: 0.0, ty: -0.1, tz: 0.2});
    newSphereF.scale({ sx: 0.05, sy: 0.05, sz: 0.9});

    newSphereA.addChild(newSphereB);
    newSphereA.addChild(newSphereC);
    newSphereA.addChild(newSphereD);
    newSphereA.addChild(newSphereE);
    newSphereA.addChild(newSphereF);

    // Build the objects to display.
    let objectsToDraw = [newSphereA];

    // Pass the vertices to WebGL.
    let draw = (objectsToDraw) => {
        for (let i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            objectsToDraw[i].buffer = GLSLUtilities.initVertexBuffer(gl, objectsToDraw[i].vertices);
            if (!objectsToDraw[i].colors) {
                objectsToDraw[i].colors = [];
                for (let j = 0, maxj = objectsToDraw[i].vertices.length / 3; j < maxj; j += 1) {
                    objectsToDraw[i].colors = objectsToDraw[i].colors.concat(
                        objectsToDraw[i].color.r,
                        objectsToDraw[i].color.g,
                        objectsToDraw[i].color.b
                    );
                }
            }
            if (!objectsToDraw[i].specularColors) {
                objectsToDraw[i].specularColors = [];
                for (let j = 0, maxj = objectsToDraw[i].vertices.length / 3; j < maxj; j += 1) {
                    objectsToDraw[i].specularColors = objectsToDraw[i].specularColors.concat(
                        objectsToDraw[i].specularColor.r,
                        objectsToDraw[i].specularColor.g,
                        objectsToDraw[i].specularColor.b
                    );
                }
            }
            objectsToDraw[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl, objectsToDraw[i].colors);
            objectsToDraw[i].specularBuffer = GLSLUtilities.initVertexBuffer(gl, objectsToDraw[i].specularColors);
            objectsToDraw[i].normalBuffer = GLSLUtilities.initVertexBuffer(gl, objectsToDraw[i].normals);

            if (objectsToDraw[i].children.length > 0) {
                draw(objectsToDraw[i].children);
            }
        }
    };

    // Initialize the shaders.
    let abort = false;
    let shaderProgram = GLSLUtilities.initSimpleShaderProgram(
        gl,
        $("#vertex-shader").text(),
        $("#fragment-shader").text(),

        // Very cursory error-checking here...
        (shader) => {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        },

        // Another simplistic error check: we don't even access the faulty
        // shader program.
        () => {
            abort = true;
            alert("Could not link shaders...sorry.");
        }
    );

    // If the abort variable is true here, we can't continue.
    if (abort) {
        alert("Fatal errors encountered; we cannot continue.");
        return;
    }

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram);

    // Hold on to the important variables within the shaders.
    let vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    let vertexDiffuseColor = gl.getAttribLocation(shaderProgram, "vertexDiffuseColor");
    gl.enableVertexAttribArray(vertexDiffuseColor);
    let vertexSpecularColor = gl.getAttribLocation(shaderProgram, "vertexSpecularColor");
    gl.enableVertexAttribArray(vertexSpecularColor);
    let normalVector = gl.getAttribLocation(shaderProgram, "normalVector");
    gl.enableVertexAttribArray(normalVector);

    let modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    let projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    let transformMatrix = gl.getUniformLocation(shaderProgram, "transformMatrix");
    let cameraMatrix = gl.getUniformLocation(shaderProgram, "cameraMatrix");

    let lightPosition = gl.getUniformLocation(shaderProgram, "lightPosition");
    let lightDiffuse = gl.getUniformLocation(shaderProgram, "lightDiffuse");
    let lightSpecular = gl.getUniformLocation(shaderProgram, "lightSpecular");
    let shininess = gl.getUniformLocation(shaderProgram, "shininess");

    let projection = new Float32Array(Matrix.perspectiveMatrix(-1, 1, -0.5, 0.5, 3, 10000).convertToWebGl());
    gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, projection);

    gl.uniformMatrix4fv(cameraMatrix, gl.FALSE, new Float32Array(
        Matrix.camera(0, 0, 14, 0, 0, 0, 0, 1, 0).convertToWebGl()));

    /*
     * Displays an individual object.
     */
    let drawObject = (object, parent) => {
        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexDiffuseColor, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, object.specularBuffer);
        gl.vertexAttribPointer(vertexSpecularColor, 3, gl.FLOAT, false, 0, 0);

        gl.uniform1f(shininess, object.shininess);

        gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(
            Matrix.rotationMatrix(rotationAroundX, 1, 0, 0).convertToWebGl()
        ));

        gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(
            Matrix.rotationMatrix(rotationAroundY, 0, 1, 0).convertToWebGl()
        ));

        object.transform();
        let objectMatrix = object.transformMatrix;
        if (parent) {
            objectMatrix = parent.transformMatrix.multiply(objectMatrix);
        }
        gl.uniformMatrix4fv(transformMatrix, gl.FALSE, new Float32Array(
            objectMatrix.convertToWebGl()));

        gl.bindBuffer(gl.ARRAY_BUFFER, object.normalBuffer);
        gl.vertexAttribPointer(normalVector, 3, gl.FLOAT, false, 0, 0);

        // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);

        let children = object.children;
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            drawObject(child, object);
        }
    };

    /*
     * Displays the scene.
     */
    let drawScene = () => {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        for (let i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            drawObject(objectsToDraw[i]);
        }

        // All done.
        gl.flush();
    };

    gl.uniform4fv(lightPosition, [-7, 3, 3, 1.0]);
    gl.uniform3fv(lightDiffuse, [0.8, 0.8, 0.8]);
    gl.uniform3fv(lightSpecular, [1.0, 1.0, 1.0]);

    draw(objectsToDraw);

    /*
     * Animates the scene.
     */
    let animationActive = false;
    let currentRotation = 0.0;
    let previousTimestamp = null;

    const FRAMES_PER_SECOND = 60;
    const MILLISECONDS_PER_FRAME = 1000 / FRAMES_PER_SECOND;

    const DEGREES_PER_MILLISECOND = 0.033;
    const FULL_CIRCLE = 360.0;

    let advanceScene = (timestamp) => {
        // Check if the user has turned things off.
        if (!animationActive) {
            return;
        }

        // Initialize the timestamp.
        if (!previousTimestamp) {
            previousTimestamp = timestamp;
            window.requestAnimationFrame(advanceScene);
            return;
        }

        // Check if it's time to advance.
        let progress = timestamp - previousTimestamp;
        if (progress < MILLISECONDS_PER_FRAME) {
            // Do nothing if it's too soon.
            window.requestAnimationFrame(advanceScene);
            return;
        }

        // All clear.
        currentRotation += DEGREES_PER_MILLISECOND * progress;

        let distanceTraveled = newSphereA.velocity.multiply(progress);
        newSphereA.translate({ tx: distanceTraveled.x, ty: distanceTraveled.y, tz: distanceTraveled.z });
        newSphereA.velocity = newSphereA.velocity.add(newSphereA.acceleration.multiply(progress));

        if (newSphereA.translateMatrix.elements[1][3] < -3) {
            newSphereA.translate({ tx: 0, ty: -3 - newSphereA.translateMatrix.elements[1][3], tz: 0 });
            newSphereA.velocity = new Vector(newSphereA.velocity.x, -newSphereA.velocity.y, newSphereA.velocity.z);
        }

        drawScene();
        if (currentRotation >= FULL_CIRCLE) {
            currentRotation -= FULL_CIRCLE;
        }

        // Request the next frame.
        previousTimestamp = timestamp;
        window.requestAnimationFrame(advanceScene);
    };

    let rotationAroundX = 0.0;
    let rotationAroundY = -90.0;
    let xRotationStart;
    let yRotationStart;
    let xDragStart;
    let yDragStart;

    let cameraRotate = (event) => {
        rotationAroundX = xRotationStart + yDragStart - event.clientY;
        rotationAroundY = yRotationStart + xDragStart - event.clientX;
        drawScene();
    };

    canvas.onmousedown = (event) => {
        xDragStart = event.clientX;
        yDragStart = event.clientY;
        xRotationStart = rotationAroundX;
        yRotationStart = rotationAroundY;
        canvas.onmousemove = cameraRotate;
    };

    canvas.onmouseup = () => {
        canvas.onmousemove = null;
    };

    // Draw the initial scene.
    drawScene();

    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(() => {
        animationActive = !animationActive;
        if (animationActive) {
            previousTimestamp = null;
            window.requestAnimationFrame(advanceScene);
        }
    });

})(document.getElementById("hello-webgl"), window.$);
