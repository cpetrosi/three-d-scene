(() => {
    class ThreeD {
        constructor(vertices, color, mode, normals) {
            this.vertices = vertices;
            this.color = color;
            this.mode = mode;
            this.normals = normals;
            this.specularColor = {r: 0.0, g: 0.0, b: 0.0};
            this.shininess = 10;
            this.children = [];
            this.scaleMatrix = new window.Matrix();
            this.translateMatrix = new window.Matrix();
            this.rotateMatrix = new window.Matrix();
            this.transformMatrix = new window.Matrix();
        }

        addChild(child) {
            this.children.push(child);
        }

        scale(specs) {
            let sx = specs.sx || 1;
            let sy = specs.sy || 1;
            let sz = specs.sz || 1;
            let scaleMatrix = window.Matrix.scaling(sx, sy, sz);
            this.scaleMatrix = this.scaleMatrix.multiply(scaleMatrix);
        }

        translate(specs) {
            let tx = specs.tx || 0;
            let ty = specs.ty || 0;
            let tz = specs.tz || 0;
            let translateMatrix = window.Matrix.translation(tx, ty, tz);
            this.translateMatrix = this.translateMatrix.multiply(translateMatrix);
        }

        rotate(specs) {
            let angle = specs.angle || 0;
            let rx = specs.rx || 0;
            let ry = specs.ry || 0;
            let rz = specs.rz || 0;
            let rotateMatrix = window.Matrix.rotationMatrix(angle, rx, ry, rz);
            this.rotateMatrix = this.rotateMatrix.multiply(rotateMatrix);
        }

        transform() {
            this.transformMatrix = this.translateMatrix.multiply(this.rotateMatrix).multiply(this.scaleMatrix);
        }
    }
    window.ThreeD = ThreeD;
})();
