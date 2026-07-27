import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Code2, Cpu, Globe, Rocket, RotateCcw } from 'lucide-react';

export const Hero3DCanvas = () => {
  const mountRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sceneRef = useRef(null);

  const themePalettes = [
    { name: 'Full Stack', primary: 0x6366f1, secondary: 0x06b6d4, accent: 0xec4899, bgGlow: '#6366f1' },
    { name: '3D & WebGL', primary: 0xa855f7, secondary: 0xd946ef, accent: 0x38bdf8, bgGlow: '#a855f7' },
    { name: 'Frontend UI', primary: 0x06b6d4, secondary: 0x10b981, accent: 0xf59e0b, bgGlow: '#06b6d4' },
    { name: 'Performance', primary: 0xf43f5e, secondary: 0xf97316, accent: 0xa855f7, bgGlow: '#f43f5e' }
  ];

  const techBadges = [
    { label: 'React & WebGL', icon: Code2, color: '#61dafb' },
    { label: '3D Interactive', icon: Cpu, color: '#a855f7' },
    { label: 'Full Stack Architect', icon: Globe, color: '#3b82f6' },
    { label: 'High Performance', icon: Rocket, color: '#f43f5e' }
  ];

  // Dynamic Terminal Canvas Texture Generator (supports live typing animation)
  const drawTerminalCanvas = (canvas, charCount = 999, showCursor = true) => {
    const ctx = canvas.getContext('2d');

    // Glass Background
    ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
    ctx.fillRect(0, 0, 512, 320);

    // Border & Glow
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.7)';
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, 506, 314);

    // Header bar
    ctx.fillStyle = 'rgba(30, 41, 59, 0.95)';
    ctx.fillRect(0, 0, 512, 48);

    // Window control buttons
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(24, 24, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#eab308'; ctx.beginPath(); ctx.arc(46, 24, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.arc(68, 24, 7, 0, Math.PI * 2); ctx.fill();

    // Header text
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 16px Inter, monospace';
    ctx.fillText('⚡ portfolio_hero.3d.js', 180, 30);

    // Code snippet
    const lines = [
      { text: 'const developer = {', color: '#ec4899' },
      { text: '  name: "Tejaswi Dubey",', color: '#38bdf8' },
      { text: '  role: "Full Stack & 3D Dev",', color: '#a855f7' },
      { text: '  stack: ["React", "Three.js", "Node"],', color: '#eab308' },
      { text: '  status: "Available for Hire 🚀"', color: '#22c55e' },
      { text: '};', color: '#ec4899' }
    ];

    ctx.font = 'bold 18px monospace';
    let totalTyped = 0;

    lines.forEach((line, idx) => {
      ctx.fillStyle = '#475569';
      ctx.fillText(`${idx + 1}`, 22, 86 + idx * 36);

      if (totalTyped < charCount) {
        const textToDraw = line.text.substring(0, charCount - totalTyped);
        ctx.fillStyle = line.color;
        ctx.fillText(textToDraw, 55, 86 + idx * 36);

        // Render Blinking Cursor at current typing position
        if (textToDraw.length < line.text.length || idx === lines.length - 1) {
          if (showCursor && totalTyped + textToDraw.length >= charCount - 1) {
            const textWidth = ctx.measureText(textToDraw).width;
            ctx.fillStyle = '#38bdf8';
            ctx.fillRect(57 + textWidth, 68 + idx * 36, 10, 20);
          }
        }
      }
      totalTyped += line.text.length;
    });
  };

  const createTerminalTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 320;
    drawTerminalCanvas(canvas, 999, true);
    const texture = new THREE.CanvasTexture(canvas);
    texture.userData = { canvas };
    return texture;
  };

  // Helper for floating node label textures
  const createNodeTexture = (label, color) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.beginPath();
    ctx.arc(128, 128, 120, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.font = 'bold 44px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, 128, 128);

    return new THREE.CanvasTexture(canvas);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Master Group for orbiting 3D elements (spin & orbit)
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Static Terminal Group for monitor & keyboard (facing forward)
    const terminalGroup = new THREE.Group();
    scene.add(terminalGroup);

    // 1. Static 3D Code Terminal Panel (Facing user)
    const terminalGeo = new THREE.PlaneGeometry(2.6, 1.6);
    const terminalTex = createTerminalTexture();
    const terminalMat = new THREE.MeshBasicMaterial({
      map: terminalTex,
      transparent: true,
      side: THREE.DoubleSide
    });
    const terminalMesh = new THREE.Mesh(terminalGeo, terminalMat);
    terminalMesh.position.set(0, 0.2, 0.5);
    terminalGroup.add(terminalMesh);

    // Terminal 3D Back Frame (Glass border)
    const frameGeo = new THREE.BoxGeometry(2.7, 1.7, 0.1);
    const frameMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e1b4b,
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.88
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.position.set(0, 0.2, 0.42);
    terminalGroup.add(frameMesh);

    // 2. 3D Mechanical Developer Keyboard (With Keywave animation)
    const keyboardGroup = new THREE.Group();
    keyboardGroup.position.set(0, -0.95, 0.55);
    keyboardGroup.rotation.x = 0.38; // Tilted toward user for 3D perspective
    terminalGroup.add(keyboardGroup);

    // Keyboard Chassis Base
    const chassisGeo = new THREE.BoxGeometry(2.5, 0.12, 0.95);
    const chassisMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      metalness: 0.85,
      roughness: 0.25,
      clearcoat: 0.9
    });
    const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
    keyboardGroup.add(chassisMesh);

    // RGB Neon Light Strip Base
    const rgbStripGeo = new THREE.BoxGeometry(2.54, 0.03, 0.99);
    const rgbStripMat = new THREE.MeshBasicMaterial({
      color: themePalettes[activeTab].accent,
      transparent: true,
      opacity: 0.8
    });
    const rgbStripMesh = new THREE.Mesh(rgbStripGeo, rgbStripMat);
    rgbStripMesh.position.y = -0.04;
    keyboardGroup.add(rgbStripMesh);

    // Keycaps Grid Layout & Keywave Tracker
    const keyCapGeo = new THREE.BoxGeometry(0.14, 0.07, 0.14);
    const keyCapMeshes = [];

    const keyRows = [
      { count: 14, z: -0.34 },
      { count: 14, z: -0.17 },
      { count: 13, z: 0.0 },
      { count: 12, z: 0.17 },
      { count: 10, z: 0.34 }
    ];

    keyRows.forEach((row, rIdx) => {
      const startX = -1.1;
      const spacing = 0.17;
      for (let i = 0; i < row.count; i++) {
        let keyMesh;
        const keyMat = new THREE.MeshStandardMaterial({
          color: 0x1e293b,
          roughness: 0.3,
          metalness: 0.5
        });

        if (rIdx === 4 && i === 4) {
          // Spacebar
          const spaceGeo = new THREE.BoxGeometry(0.75, 0.07, 0.14);
          keyMesh = new THREE.Mesh(spaceGeo, keyMat);
          keyMesh.position.set(0, 0.08, row.z);
          i += 3;
        } else {
          if ((rIdx === 0 && i === 0) || (rIdx === 3 && i === row.count - 1)) {
            keyMat.color.setHex(themePalettes[activeTab].primary); // Esc / Enter
          } else if (i === 0 || i === row.count - 1) {
            keyMat.color.setHex(themePalettes[activeTab].accent);
          }

          keyMesh = new THREE.Mesh(keyCapGeo, keyMat);
          keyMesh.position.set(startX + i * spacing, 0.08, row.z);
        }

        keyboardGroup.add(keyMesh);
        keyCapMeshes.push({ mesh: keyMesh, initialY: 0.08, posX: keyMesh.position.x });
      }
    });

    // 3. Orbiting Energy Rings
    const ringGroup = new THREE.Group();
    masterGroup.add(ringGroup);

    const ringGeo = new THREE.TorusGeometry(2.4, 0.02, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: themePalettes[activeTab].primary,
      transparent: true,
      opacity: 0.7
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: themePalettes[activeTab].accent,
      transparent: true,
      opacity: 0.5
    });
    const ring2 = new THREE.Mesh(ringGeo, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    ringGroup.add(ring2);

    // 4. Floating Tech Polyhedrons / Crystals
    const crystalGroup = new THREE.Group();
    masterGroup.add(crystalGroup);

    const crystalGeo = new THREE.OctahedronGeometry(0.25, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: themePalettes[activeTab].accent,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: true
    });

    for (let c = 0; c < 4; c++) {
      const crystal = new THREE.Mesh(crystalGeo, crystalMat);
      const angle = (c / 4) * Math.PI * 2;
      crystal.position.set(Math.cos(angle) * 1.8, Math.sin(angle) * 0.8, Math.sin(angle) * 1.8);
      crystalGroup.add(crystal);
    }

    // 5. Orbiting Tech Nodes (Spheres with Canvas Textures)
    const nodesData = [
      { label: 'React', color: '#61dafb', angle: 0 },
      { label: '3D', color: '#a855f7', angle: Math.PI / 3 },
      { label: 'Node', color: '#22c55e', angle: (2 * Math.PI) / 3 },
      { label: 'WebGL', color: '#ec4899', angle: Math.PI },
      { label: 'JS', color: '#f59e0b', angle: (4 * Math.PI) / 3 },
      { label: 'API', color: '#38bdf8', angle: (5 * Math.PI) / 3 }
    ];

    const nodeGroup = new THREE.Group();
    masterGroup.add(nodeGroup);
    const nodeMeshes = [];

    nodesData.forEach((item) => {
      const radius = 2.4;
      const nodeGeo = new THREE.SphereGeometry(0.28, 32, 32);
      const nodeTex = createNodeTexture(item.label, item.color);
      const nodeMat = new THREE.MeshBasicMaterial({
        map: nodeTex,
        transparent: true
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.x = Math.cos(item.angle) * radius;
      nodeMesh.position.z = Math.sin(item.angle * radius);
      nodeMesh.position.y = Math.sin(item.angle * 2) * 0.4;
      nodeGroup.add(nodeMesh);
      nodeMeshes.push({ mesh: nodeMesh, angle: item.angle, radius, speed: 0.01 });
    });

    // Constellation Lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: themePalettes[activeTab].primary,
      transparent: true,
      opacity: 0.3
    });
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(nodesData.length * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    masterGroup.add(linesMesh);

    // 6. Starfield Particle System
    const particleCount = 600;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: themePalettes[activeTab].primary,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Dynamic Point Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(themePalettes[activeTab].primary, 4, 30);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(themePalettes[activeTab].accent, 3, 30);
    light2.position.set(-5, -5, 2);
    scene.add(light2);

    // Drag Orbit Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaMove = {
          x: e.clientX - previousMousePosition.x,
          y: e.clientY - previousMousePosition.y
        };

        targetRotationY += deltaMove.x * 0.008;
        targetRotationX += deltaMove.y * 0.008;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Resize Observer
    const resizeObserver = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const w = entry.contentRect.width;
      const h = entry.contentRect.height;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    // Intersection Observer
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry) {
        isVisible = entry.isIntersecting;
      }
    });
    intersectionObserver.observe(container);

    // Render loop with typing & RGB keywave
    let animationId;
    const clock = new THREE.Clock();
    let typedCharCount = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const time = clock.getElapsedTime();

      // Live Code Typing effect on terminal texture
      typedCharCount = Math.floor(time * 18) % 180;
      const showCursor = Math.floor(time * 3) % 2 === 0;
      drawTerminalCanvas(terminalTex.userData.canvas, typedCharCount, showCursor);
      terminalTex.needsUpdate = true;

      // 3D Keyboard Live RGB Keywave animation
      keyCapMeshes.forEach((item) => {
        const keyWave = Math.sin(time * 5 - item.posX * 3);
        if (keyWave > 0.75) {
          item.mesh.position.y = item.initialY - 0.02;
          item.mesh.material.emissive.setHex(themePalettes[activeTab].accent);
          item.mesh.material.emissiveIntensity = 0.6;
        } else {
          item.mesh.position.y = item.initialY;
          item.mesh.material.emissiveIntensity = 0;
        }
      });

      // Smooth inertia rotation
      if (!isDragging) {
        targetRotationY += (mouseX * 0.4 - targetRotationY) * 0.04;
        targetRotationX += (-mouseY * 0.4 - targetRotationX) * 0.04;
      }

      masterGroup.rotation.y = time * 0.15 + targetRotationY;
      masterGroup.rotation.x = Math.sin(time * 0.2) * 0.1 + targetRotationX;

      // Static Monitor floating wave animation & subtle mouse tilt (stays front-facing)
      terminalGroup.position.y = Math.sin(time * 1.5) * 0.06;
      terminalGroup.rotation.y = mouseX * 0.08;
      terminalGroup.rotation.x = -mouseY * 0.08;

      // Keyboard RGB Strip pulse & orbital lights
      rgbStripMat.opacity = 0.6 + Math.sin(time * 2.5) * 0.25;
      light1.position.x = Math.sin(time * 0.8) * 5;
      light1.position.z = Math.cos(time * 0.8) * 5;

      // Crystal polyhedrons animation
      crystalGroup.rotation.y = -time * 0.4;
      crystalGroup.rotation.z = time * 0.2;

      // Rings rotation
      ringGroup.rotation.z = time * 0.25;

      // Update orbiting tech nodes & lines
      const positions = lineGeometry.attributes.position.array;
      nodeMeshes.forEach((item, idx) => {
        item.angle += item.speed;
        item.mesh.position.x = Math.cos(item.angle) * item.radius;
        item.mesh.position.z = Math.sin(item.angle) * item.radius;
        item.mesh.position.y = Math.sin(item.angle * 2 + time) * 0.35;
        item.mesh.rotation.y = -masterGroup.rotation.y;

        const pIdx = idx * 6;
        positions[pIdx] = item.mesh.position.x;
        positions[pIdx + 1] = item.mesh.position.y;
        positions[pIdx + 2] = item.mesh.position.z;
        positions[pIdx + 3] = 0;
        positions[pIdx + 4] = 0;
        positions[pIdx + 5] = 0;
      });
      lineGeometry.attributes.position.needsUpdate = true;

      // Rotate particle field
      particleSystem.rotation.y = time * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      terminalGeo.dispose();
      terminalTex.dispose();
      terminalMat.dispose();
      frameGeo.dispose();
      frameMat.dispose();
      chassisGeo.dispose();
      chassisMat.dispose();
      rgbStripGeo.dispose();
      rgbStripMat.dispose();
      keyCapGeo.dispose();
      keyCapMeshes.forEach(k => k.mesh.material.dispose());
      crystalGeo.dispose();
      crystalMat.dispose();
      ringGeo.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [activeTab]);

  return (
    <div
      className="hero-3d-wrapper"
      ref={mountRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ '--hero-glow': themePalettes[activeTab].bgGlow }}
    >
      {/* Dynamic Ambient Background Glow */}
      <div className="hero-3d-bg-glow" />

      {/* WebGL 3D Canvas */}
      <canvas ref={canvasRef} className="hero-3d-canvas" />

      {/* Interactive Helper Indicator */}
      <div className="hero-3d-hint">
        <RotateCcw size={14} className="hint-icon" />
        <span>Drag mouse to rotate 3D view</span>
      </div>

      {/* Tech Mode Switcher overlay */}
      <div className="hero-3d-overlay">
        <div className="hero-3d-badge-grid">
          {techBadges.map((badge, idx) => {
            const IconComponent = badge.icon;
            const isActive = activeTab === idx;
            return (
              <div
                key={idx}
                className={`hero-3d-badge ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(idx)}
                style={{ '--badge-accent': badge.color }}
              >
                <div className="badge-icon-wrap" style={{ color: badge.color }}>
                  <IconComponent size={18} />
                </div>
                <span className="badge-text">{badge.label}</span>
                {isActive && <Sparkles size={14} className="badge-sparkle" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
