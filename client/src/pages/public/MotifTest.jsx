import {
  MotifArches,
  MotifReturn,
  MotifWaves,
  MotifHorns,
  MotifArch,
  MotifParallel,
  MotifHexSlash,
} from '../../components/marathon';

/**
 * Page de test pour visualiser les motifs
 * Accessible via /motif-test
 */
function MotifTest() {
  const motifs = [
    { Component: MotifArches, name: 'Fig01 - Arches', desc: 'Triple colonnes avec arches' },
    { Component: MotifReturn, name: 'Fig02 - Return', desc: 'Symbole de retour P inversé' },
    { Component: MotifWaves, name: 'Fig03 - Waves', desc: 'Triple vague entrelacée' },
    { Component: MotifHorns, name: 'Fig04 - Horns', desc: 'Cornes / Y inversé' },
    { Component: MotifArch, name: 'Fig05 - Arch', desc: 'Rectangle + double arche' },
    { Component: MotifParallel, name: 'Fig06 - Parallel', desc: 'Double parallélogramme' },
    { Component: MotifHexSlash, name: 'Fig07 - HexSlash', desc: 'Hexagone barré' },
  ];

  return (
    <div className="min-h-screen bg-black p-8">
      <h1 className="text-lime text-3xl font-condensed font-bold mb-8 tracking-widest">
        TEST MOTIFS MARATHON
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {motifs.map(({ Component, name, desc }) => (
          <div key={name} className="bg-surface p-6 rounded border border-lime/20">
            <div className="flex justify-center mb-4 bg-black p-4 rounded">
              <Component size={120} color="cream" />
            </div>
            <h2 className="text-lime font-mono text-sm tracking-wider mb-1">{name}</h2>
            <p className="text-grey text-xs">{desc}</p>
          </div>
        ))}
      </div>

      {/* Variantes de couleurs */}
      <h2 className="text-lime text-2xl font-condensed font-bold mt-12 mb-6 tracking-widest">
        VARIANTES COULEURS
      </h2>
      <div className="flex flex-wrap gap-8">
        <div className="bg-black p-6 border border-lime/20">
          <MotifWaves size={100} color="lime" />
          <p className="text-lime text-xs mt-2 font-mono">lime</p>
        </div>
        <div className="bg-black p-6 border border-cyan/20">
          <MotifWaves size={100} color="cyan" />
          <p className="text-cyan text-xs mt-2 font-mono">cyan</p>
        </div>
        <div className="bg-black p-6 border border-white/20">
          <MotifWaves size={100} color="white" />
          <p className="text-white text-xs mt-2 font-mono">white</p>
        </div>
        <div className="bg-lime p-6 border border-black/20">
          <MotifWaves size={100} color="#000000" />
          <p className="text-black text-xs mt-2 font-mono">black sur lime</p>
        </div>
      </div>

      {/* Tailles */}
      <h2 className="text-lime text-2xl font-condensed font-bold mt-12 mb-6 tracking-widest">
        TAILLES
      </h2>
      <div className="flex flex-wrap items-end gap-6 bg-black p-6 border border-lime/20">
        <div>
          <MotifHexSlash size={40} color="lime" />
          <p className="text-grey text-xs mt-2 font-mono text-center">40px</p>
        </div>
        <div>
          <MotifHexSlash size={60} color="lime" />
          <p className="text-grey text-xs mt-2 font-mono text-center">60px</p>
        </div>
        <div>
          <MotifHexSlash size={80} color="lime" />
          <p className="text-grey text-xs mt-2 font-mono text-center">80px</p>
        </div>
        <div>
          <MotifHexSlash size={100} color="lime" />
          <p className="text-grey text-xs mt-2 font-mono text-center">100px</p>
        </div>
        <div>
          <MotifHexSlash size={150} color="lime" />
          <p className="text-grey text-xs mt-2 font-mono text-center">150px</p>
        </div>
      </div>
    </div>
  );
}

export default MotifTest;
