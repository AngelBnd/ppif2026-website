import cloudImg from '@/assets/games/dataTrace/cloud.webp';
import codeImg from '@/assets/games/dataTrace/code.webp';
import codieImg from '@/assets/games/dataTrace/codie.webp';
import copasImg from '@/assets/games/dataTrace/copas.webp';
import debugImg from '@/assets/games/dataTrace/debug.webp';
import fireImg from '@/assets/games/dataTrace/fire.webp';
import foxImg from '@/assets/games/dataTrace/fox.webp';
import githubImg from '@/assets/games/dataTrace/github.webp';
import htmlImg from '@/assets/games/dataTrace/html.webp';
import ppifImg from '@/assets/games/dataTrace/ppif.webp';
import pythonImg from '@/assets/games/dataTrace/python.webp';
import storageImg from '@/assets/games/dataTrace/storage.webp';
import studioImg from '@/assets/games/dataTrace/studio.webp';
import visualImg from '@/assets/games/dataTrace/visual.webp';

/**
 * Data Trace images stay bundled/optimized by Vite instead of living in the
 * database — the DB only stores these keys (see data_trace_questions.images),
 * resolved to the actual asset here.
 */
export const DATA_TRACE_ASSETS: Record<string, string> = {
    ppif: ppifImg,
    html: htmlImg,
    cloud: cloudImg,
    storage: storageImg,
    fire: fireImg,
    fox: foxImg,
    python: pythonImg,
    visual: visualImg,
    studio: studioImg,
    code: codeImg,
    github: githubImg,
    debug: debugImg,
    copas: copasImg,
    codie: codieImg,
};
