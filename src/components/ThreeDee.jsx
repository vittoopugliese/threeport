import React, {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import {FirstPersonControls} from "three/addons/controls/FirstPersonControls.js";
import {gsap} from "gsap";

export const ThreeDee = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const scene = new THREE.Scene();
    const geometry = new THREE.SphereGeometry(2.54, 74, 74);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/gas.png");

    const material = new THREE.MeshStandardMaterial({
      map: texture,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 10, 10);
    scene.add(light);

    const camera = new THREE.PerspectiveCamera(
      90,
      sizes.width / sizes.height,
      1,
      200
    );
    camera.position.z = 10;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({canvas: canvasRef.current});
    renderer.setSize(sizes.width, sizes.height);
    renderer.setClearColor("#010101");
    renderer.setPixelRatio(window.devicePixelRatio);

    const controls = new FirstPersonControls(camera, renderer.domElement);

    const renderScene = () => {
      renderer.render(scene, camera);
    };

    const timeline = gsap.timeline({defaults: {duration: 1}});
    timeline.fromTo(mesh.scale, {z: 0, x: 0, y: 0}, {z: 1, x: 1, y: 1});

    const keys = {
      KeyW: false,
      KeyA: false,
      KeyS: false,
      KeyD: false,
      Space: false,
      ShiftLeft: false,
    };

    const handleKeyDown = (event) => {
      const key = event.code
      // eslint-disable-next-line no-prototype-builtins
      if (keys.hasOwnProperty(key)) {
        keys[key] = true;
      }
    };

    const handleKeyUp = (event) => {
      const key = event.code
      // eslint-disable-next-line no-prototype-builtins
      if (keys.hasOwnProperty(key)) {
        keys[key] = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const moveSpeed = 0.01;

    const moveCamera = () => {
      if (keys.KeyS) {
        mesh.position.z -= moveSpeed;
      }
      if (keys.KeyD) {
        mesh.position.x -= moveSpeed;
      }
      if (keys.KeyW) {
        mesh.position.z += moveSpeed;
      }
      if (keys.KeyA) {
        mesh.position.x += moveSpeed;
      }
      if (keys.Space) {
        mesh.position.y -= moveSpeed;
      }
      if (keys.ShiftLeft) {
        mesh.position.y += moveSpeed;
      }
    };

    const animate = () => {
      renderScene();
      animationFrameId = window.requestAnimationFrame(animate);
      moveCamera();
    };

    animate();

    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderScene();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrameId);

      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="three-container" ref={containerRef}>
      <canvas ref={canvasRef} className="webgl" />
    </div>
  );
};
