import { Scene } from 'phaser';

export class MainMenu extends Scene {
    circle: Phaser.Physics.Arcade.Image;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    lines: Phaser.GameObjects.Graphics;

    constructor() {
        super('MainMenu');
    }

    create() {
        const rows = 5;
        const cols = 5;
        const spriteSize = 40;
        const startX = 40;
        const startY = 40;
        const spacing = 40;

        // Create a static group for the boxes
        const boxes = this.physics.add.staticGroup();

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = startX + col * (spriteSize + spacing);
                const y = startY + row * (spriteSize + spacing);

                // Create a box as a physics-enabled sprite
                const box = this.add.rectangle(x, y, spriteSize, spriteSize, 0x00ff00);
                this.physics.add.existing(box, true);
                boxes.add(box);
            }
        }

        // Create a graphics object for the circle
        const circleGraphics = this.add.graphics();
        circleGraphics.fillStyle(0xff0000, 1); // Set the fill color (e.g., red)
        circleGraphics.fillCircle(15, 15, 15); // Draw the circle with radius 15

        // Generate a texture from the graphics object
        circleGraphics.generateTexture('circleTexture', 30, 30);
        circleGraphics.destroy(); // Destroy the graphics object as it's no longer needed

        // Create the circle using the generated texture
        this.circle = this.physics.add.image(200, 200, 'circleTexture');
        this.circle.setCollideWorldBounds(true);

        // Enable collision between the circle and the boxes
        this.physics.add.collider(this.circle, boxes);

        // Create cursor keys for movement
        this.cursors = this.input.keyboard?.createCursorKeys();

        // Create a graphics object for the lines
        this.lines = this.add.graphics();
        this.lines.lineStyle(5, 0x0000ff, 1); // Set the line style (thickness and color)
        this.lines.strokeLineShape(new Phaser.Geom.Line(-5, -15, -5, -30)); // Draw the first line
        this.lines.strokeLineShape(new Phaser.Geom.Line(5, -15, 5, -30)); // Draw the second line
    }

    update() {
        // Reset velocity
        this.circle.setVelocity(0);

        // Move the circle based on cursor keys
        if (this.cursors) {
            if (this.cursors.left.isDown) {
                this.circle.setVelocityX(-160);
                this.lines.rotation = Phaser.Math.DegToRad(270); // Point lines to the left
            } else if (this.cursors.right.isDown) {
                this.circle.setVelocityX(160);
                this.lines.rotation = Phaser.Math.DegToRad(90); // Point lines to the right
            }

            if (this.cursors.up.isDown) {
                this.circle.setVelocityY(-160);
                this.lines.rotation = Phaser.Math.DegToRad(0); // Point lines up
            } else if (this.cursors.down.isDown) {
                this.circle.setVelocityY(160);
                this.lines.rotation = Phaser.Math.DegToRad(180); // Point lines down
            }
        }

        // Update the position of the lines to match the circle
        this.lines.setPosition(this.circle.x, this.circle.y);
    }
}
