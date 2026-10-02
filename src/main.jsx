import React, { Suspense, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, OrbitControls, RoundedBox, Text } from '@react-three/drei'
import './styles.css'

function Arch({ position, color = '#d3ff44' }) {
  return <group position={position}>
    <RoundedBox args={[1.9, 3.4, .28]} radius={.16} smoothness={5} position={[0, 0, 0]}><meshStandardMaterial color={color} roughness={.38} metalness={.04} /></RoundedBox>
    <RoundedBox args={[1.25, 2.7, .34]} radius={.55} smoothness={5} position={[0, -.28, -.02]}><meshStandardMaterial color="#131414" roughness={.8} /></RoundedBox>
  </group>
}

function Pedestal({ position, tint, label }) {
  return <group position={position}>
    <RoundedBox args={[1.1, 1.45, 1.1]} radius={.08} smoothness={5} position={[0, -.05, 0]}><meshStandardMaterial color={tint} roughness={.5} /></RoundedBox>
    <Float speed={1.8} rotationIntensity={.15} floatIntensity={.18}>
      <mesh position={[0, 1.05, 0]} rotation={[.25, .5, -.2]} castShadow>
        <icosahedronGeometry args={[.58, 2]} /><meshStandardMaterial color="#f4f4ed" roughness={.22} metalness={.3} />
      </mesh>
    </Float>
    <Text position={[0, -.83, .57]} fontSize={.13} color="#151515" anchorX="center">{label}</Text>
  </group>
}

function Gallery() {
  const group = useRef()
  useFrame((state) => { if (group.current) group.current.rotation.y = Math.sin(state.clock.elapsedTime * .12) * .035 })
  return <group ref={group}>
    <color attach="background" args={['#222421']} />
    <ambientLight intensity={.65} />
    <spotLight position={[1, 6, 3]} angle={.55} penumbra={1} intensity={220} color="#f9f8e9" castShadow />
    <pointLight position={[-4, 2, 1]} intensity={28} color="#d3ff44" />
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[20, 20]} /><meshStandardMaterial color="#30332e" roughness={.86} /></mesh>
    <Arch position={[-2.65, .45, -1.2]} />
    <Arch position={[2.65, .45, -1.2]} color="#f06b52" />
    <Pedestal position={[-1.25, .6, .3]} tint="#e0e1d7" label="OBJECT 01" />
    <Pedestal position={[1.2, .6, -.1]} tint="#d3ff44" label="OBJECT 02" />
    <mesh position={[0, 3.3, -2.4]}><planeGeometry args={[2.5, .6]} /><meshBasicMaterial color="#f5f6ed" /><Text position={[0, 0, .02]} fontSize={.17} color="#151515">NOVA / STUDIO</Text></mesh>
    <Environment preset="city" />
    <OrbitControls enablePan={false} minDistance={6} maxDistance={9} minPolarAngle={1.1} maxPolarAngle={1.65} />
  </group>
}

function App() {
  const [published, setPublished] = useState(false)
  const [active, setActive] = useState('Gallery')
  const [panel, setPanel] = useState(false)
  useEffect(() => { const handle = (e) => { if (e.key === 'Escape') setPanel(false) }; window.addEventListener('keydown', handle); return () => window.removeEventListener('keydown', handle) }, [])
  return <main>
    <nav><a className="brand" href="#top"><span>R</span><b>ROOMKIT</b><small>by yngcompany</small></a><div className="nav-links"><a href="#how">How it works</a><a href="#templates">Templates</a><a href="#pricing">Pricing</a></div><button className="text-button" onClick={() => setPanel(true)}>Sign in <i>↗</i></button></nav>
    <section className="hero" id="top">
      <div className="hero-copy"><p className="eyebrow">A yngcompany spatial product</p><h1>Build spaces<br/>people <em>feel.</em></h1><p className="lede">RoomKit is the visual builder for brands making their next dimension of commerce.</p><div className="actions"><button className="primary" onClick={() => document.querySelector('#builder').scrollIntoView({behavior:'smooth'})}>Start building <span>→</span></button><button className="play" onClick={() => setPanel(true)}><b>▶</b> See it in motion</button></div><div className="hero-foot"><span>NO CODE</span><span>3D CANVAS</span><span>MADE FOR BRANDS</span></div></div>
      <div className="hero-art"><div className="canvas-label"><span>LIVE SPACE</span><span>•</span><span>01 / 03</span></div><Canvas shadows camera={{position:[0,2.4,7.3], fov:42}}><Suspense fallback={null}><Gallery /></Suspense></Canvas><div className="cursor-note">DRAG TO EXPLORE <span>↗</span></div><div className="orbit one"></div><div className="orbit two"></div></div>
    </section>
    <section className="marquee"><div>CREATE SPATIAL STORIES <b>✦</b> CREATE SPATIAL STORIES <b>✦</b> CREATE SPATIAL STORIES <b>✦</b></div></section>
    <section className="builder" id="builder"><div className="section-kicker">01 — THE BUILDER</div><div className="builder-grid"><div><h2>Your vision,<br/><em>in every axis.</em></h2><p>Go from blank canvas to a living, shoppable world without handing over your creative control.</p><button className="link-button" onClick={() => setActive(active === 'Gallery' ? 'Studio' : 'Gallery')}>Explore the workspace <span>→</span></button></div><div className="editor"><aside><div className="editor-logo">R</div><div className="tools"><button className="active">✦</button><button>◼</button><button>◯</button><button>↖</button></div><div className="avatar">A</div></aside><div className="editor-main"><header><span>{active} / Nova Collection</span><div><button>Preview</button><button className={published ? 'published' : 'publish'} onClick={() => setPublished(!published)}>{published ? 'Published ✓' : 'Publish'}</button></div></header><div className="editor-canvas"><div className="grid-lines"></div><div className="editor-orb"></div><div className="editor-card"><small>SELECTED OBJECT</small><b>ORB / CHROME</b><span>Position  X  240  Y  180</span></div><div className="editor-copy">NOVA<br/><i>Objects in orbit.</i></div></div><footer><span>SCENE</span><span>OBJECTS (04)</span><span>LIGHTING</span><span>SETTINGS</span></footer></div></div></div></section>
    <section className="features" id="how"><div className="section-kicker">02 — MADE TO MOVE</div><div className="feature-list"><article><span>01</span><h3>Compose<br/>intuitively.</h3><p>Place, scale and style every surface in a visual workspace that keeps up with your ideas.</p></article><article><span>02</span><h3>Make every<br/>object matter.</h3><p>Turn any asset into a clickable moment with content, commerce and conversation built in.</p></article><article><span>03</span><h3>Share worlds,<br/>not links.</h3><p>Publish rich interactive spaces that feel native everywhere your audience discovers you.</p></article></div></section>
    <section className="cta" id="templates"><p className="eyebrow">YOUR NEXT SPACE IS WAITING.</p><h2>What will you<br/><em>bring to life?</em></h2><button className="primary" onClick={() => document.querySelector('#builder').scrollIntoView({behavior:'smooth'})}>Create a showroom <span>→</span></button></section>
    <footer className="site-footer"><a className="brand" href="#top"><span>R</span><b>ROOMKIT</b><small>by yngcompany</small></a><p>© 2026 <strong>yngcompany</strong>. RoomKit is a spatial commerce concept.</p><div><a href="#top">Instagram</a><a href="#top">LinkedIn</a></div></footer>
    {panel && <div className="modal-backdrop" onClick={() => setPanel(false)}><div className="modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setPanel(false)}>×</button><p className="eyebrow">ROOMKIT / YNGCOMPANY</p><h2>Ready to make<br/>space memorable?</h2><p>RoomKit is a spatial-web SaaS concept designed and built by yngcompany.</p><button className="primary" onClick={() => setPanel(false)}>Let’s build <span>→</span></button></div></div>}
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
