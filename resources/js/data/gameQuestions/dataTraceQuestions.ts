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

export const IMG_QS = [
    {
        n: 1,
        imgs: [ppifImg],
        desc: 'Logo atau gambar apakah diatas ini??',
        ans: ['ppif'],
    },
    {
        n: 1,
        imgs: [htmlImg],
        desc: 'Logo apakah diatas ini?',
        ans: ['html'],
    },
    {
        n: 2,
        imgs: [cloudImg, storageImg],
        desc: 'Suatu istilah dalam teknologi yang sering kita pakai?',
        ans: ['cloud storage', 'cloudstorage'],
    },
    {
        n: 2,
        imgs: [fireImg, foxImg],
        desc: 'Logo apakah ini?',
        ans: ['fire fox', 'firefox'],
    },
    {
        n: 1,
        imgs: [pythonImg],
        desc: 'Salah satu bahasa pemrograman?',
        ans: ['python'],
    },
    {
        n: 3,
        imgs: [visualImg, studioImg, codeImg],
        desc: 'Suatu aplikasi yang digunakan para programmer',
        ans: ['visual studio code', 'visualstudiocode', 'vscode', 'vs code'],
    },
    {
        n: 1,
        imgs: [githubImg],
        desc: 'Logo apakah ini?',
        ans: ['github'],
    },
    {
        n: 2,
        imgs: [debugImg, codeImg],
        desc: 'Suatu proses dalam mencari error?',
        ans: ['debugging', 'debug'],
    },
    {
        n: 1,
        imgs: [copasImg],
        desc: 'Kegunaan tombol ini?',
        ans: ['copy paste', 'copypaste'],
    },
    {
        n: 1,
        imgs: [codieImg],
        desc: 'Siapakah ini??',
        ans: ['codie'],
    },
];
