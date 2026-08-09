import AdminPlain from '@/assets/about/divisions/divLogos/AdminPlain.webp';
import BitmapPlain from '@/assets/about/divisions/divLogos/BitmapPlain.webp';
import ConsolePlain from '@/assets/about/divisions/divLogos/ConsolePlain.webp';
import DeveloperPlain from '@/assets/about/divisions/divLogos/DeveloperPlain.webp';
import EncryptorPlain from '@/assets/about/divisions/divLogos/EncryptorPlain.webp';
import ExtensionPlain from '@/assets/about/divisions/divLogos/ExtensionPlain.webp';
import InterfacePlain from '@/assets/about/divisions/divLogos/InterfacePlain.webp';
import ModulePlain from '@/assets/about/divisions/divLogos/ModulePlain.webp';
import PMPlain from '@/assets/about/divisions/divLogos/PMPlain.webp';
import SnapshotPlain from '@/assets/about/divisions/divLogos/SnapshotPlain.webp';
import Admin from '@/assets/about/divisions/divNames/ADMIN.svg';
import Bitmap from '@/assets/about/divisions/divNames/BITMAP.svg';
import Console from '@/assets/about/divisions/divNames/CONSOLE.svg';
import Developer from '@/assets/about/divisions/divNames/DEVELOPER.svg';
import Encryptor from '@/assets/about/divisions/divNames/ENCRYPTOR.svg';
import Extension from '@/assets/about/divisions/divNames/EXTENSION.svg';
import Interface from '@/assets/about/divisions/divNames/INTERFACE.svg';
import Module from '@/assets/about/divisions/divNames/MODULE.svg';
import PM from '@/assets/about/divisions/divNames/PM.svg';
import Snapshot from '@/assets/about/divisions/divNames/SNAPSHOT.svg';
type DivisionMember = {
    picture: string;
    name: string;
    role: string;
};

// Member photos live in public/webp/divisi/<DIVISION>/<file>. They are served
// from the site root, so we reference them by URL (Vite does not transform
// files under public/ via import). encodeURI keeps the spaces in filenames safe.
const pic = (division: string, file: string) =>
    encodeURI(`/webp/divisi/${division}/${file}`);

export type DivisionData = {
    name: string;
    description: string;
    nameSrc: string;
    image: string;
    members: DivisionMember[];
    direction: 'left' | 'right';
    vertical: {
        side: 'top' | 'bottom';
        value: string;
    };
    left: string;
    namePosition: {
        left: string;
        bottom: string;
    };

    namePositionPopup: {
        left: string;
        bottom: string;
    };
    widthPopup: string;
};

const shortenName = (name: string) => {
    const words = name.trim().split(/\s+/);

    if (words.length < 3) return name;

    const firstTwoWords = words.slice(0, 2);
    const shortenedRest = words.slice(2).map((word) => `${word[0]}.`);

    return [...firstTwoWords, ...shortenedRest].join(' ');
};
const makeMembers = (
    members: {
        picture: string;
        name: string;
        role: string;
    }[],
): DivisionMember[] =>
    members.map((member) => ({
        picture: member.picture,
        name: shortenName(member.name),
        role: member.role,
    }));

const divisionMembers = {
    Acara: makeMembers([
        {
            picture: pic('DEVELOPER', 'Jessy 1.webp'),
            name: 'Jessy Valentine',
            role: 'Koordinator',
        },
        {
            picture: pic('DEVELOPER', 'Will 1.webp'),
            name: 'William Asabha Purnamadjaja',
            role: 'Koordinator',
        },
        {
            picture: pic('DEVELOPER', 'Ashfa 1.webp'),
            name: 'Muhammad Ashfa',
            role: 'Anggota',
        },
        {
            picture: pic('DEVELOPER', 'Kevin 1.webp'),
            name: 'Ritz Kevin Heryanto',
            role: 'Anggota',
        },
        {
            picture: pic('DEVELOPER', 'Jon 1.webp'),
            name: 'Jonah Matthew Santoso',
            role: 'Anggota',
        },
        {
            picture: pic('DEVELOPER', 'Des 1.webp'),
            name: 'Desslyn Marcela',
            role: 'Anggota',
        },
    ]),

    Visual: makeMembers([
        {
            picture: pic('BITMAP', 'wilson 1.webp'),
            name: 'Alfred Wilson Kwan',
            role: 'Koordinator',
        },
        {
            picture: pic('BITMAP', 'Vanessa 1.webp'),
            name: 'Vanessa Laurensia',
            role: 'Koordinator',
        },
        {
            picture: pic('BITMAP', 'dhita 2.webp'),
            name: 'Dhita Paramita Citra',
            role: 'Anggota',
        },
        {
            picture: pic('BITMAP', 'Daniel 1.webp'),
            name: 'Daniel Kurnia Gunawan',
            role: 'Anggota',
        },
        {
            picture: pic('BITMAP', 'Riani 1.webp'),
            name: 'Riani Freefina Arifin',
            role: 'Anggota',
        },
        {
            picture: pic('BITMAP', 'eldo 1.webp'),
            name: 'Eldo Sanders',
            role: 'Anggota',
        },
    ]),

    'Person in Charge': makeMembers([
        {
            picture: pic('MODULE', 'dheryl 1.webp'),
            name: 'Dheryl Christofer Yahya',
            role: 'Koordinator',
        },
        {
            picture: pic('MODULE', 'sebastian 1.webp'),
            name: 'Sebastian Benaya',
            role: 'Koordinator',
        },
        {
            picture: pic('MODULE', 'sielyne 1.webp'),
            name: 'Sielyne Dwi Putri',
            role: 'Koordinator',
        },
        {
            picture: pic('MODULE', 'sindhi 1.webp'),
            name: 'Sindhi Ananta',
            role: 'Anggota',
        },
        {
            picture: pic('MODULE', 'jonathan kent 1.webp'),
            name: 'Jonathan Kent Wijaya',
            role: 'Anggota',
        },
        {
            picture: pic('MODULE', 'carlos 1.webp'),
            name: 'Carlos Limanto',
            role: 'Anggota',
        },
        {
            picture: pic('MODULE', 'devyna 1.webp'),
            name: 'Devyna Dhamawany Kusuma',
            role: 'Anggota',
        },
        {
            picture: pic('MODULE', 'reivan 1.webp'),
            name: 'Muhammad Reivan Febriano',
            role: 'Anggota',
        },
        {
            picture: pic('MODULE', 'steven ong 1.webp'),
            name: 'Steven Ong Gunawan',
            role: 'Anggota',
        },
        {
            picture: pic('MODULE', 'andika 1.webp'),
            name: 'Andika Syahfutra',
            role: 'Anggota',
        },
        {
            picture: pic('MODULE', 'dimas 1.webp'),
            name: 'Dimas Pradhitya',
            role: 'Anggota',
        },
        {
            picture: pic('MODULE', 'christoper yogis 1.webp'),
            name: 'Christopher Yogiswara L. S.',
            role: 'Anggota',
        },
        {
            picture: pic('MODULE', 'gavin 1.webp'),
            name: 'Gavin Tanzil',
            role: 'Anggota',
        },
        {
            picture: pic('MODULE', 'dustin 1.webp'),
            name: 'Dustin Nathaniel Bernadi',
            role: 'Anggota',
        },
        {
            picture: pic('MODULE', 'rivera 1.webp'),
            name: 'Rivera Manuela Tamba',
            role: 'Anggota',
        },
        {
            picture: pic('MODULE', 'yoga 1.webp'),
            name: 'Yoga Valentino Samputra',
            role: 'Anggota',
        },
        {
            picture: pic('MODULE', 'rassya 1.webp'),
            name: 'M. Rassya',
            role: 'Anggota',
        },
        {
            picture: pic('MODULE', 'christian surya 1.webp'),
            name: 'Christian Surya Themadja',
            role: 'Anggota',
        },
        {
            picture: pic('MODULE', 'michael 1.webp'),
            name: 'Michael Sahala',
            role: 'Anggota',
        },
    ]),

    Keamanan: makeMembers([
        {
            picture: pic('ENCRYPTOR', 'Muhandis Jundi Rabbani 1.webp'),
            name: 'Muhandis Jundi Rabbani',
            role: 'Koordinator',
        },
        {
            picture: pic('ENCRYPTOR', 'Victor Chandra 1.webp'),
            name: 'Victor Chandra',
            role: 'Koordinator',
        },
        {
            picture: pic('ENCRYPTOR', 'Cecillia Wijaya 1.webp'),
            name: 'Cecilia Wijaya',
            role: 'Koordinator',
        },
        {
            picture: pic('ENCRYPTOR', 'Clifton Adriel 1.webp'),
            name: 'Clifton Adriel Surya',
            role: 'Anggota',
        },
        {
            picture: pic('ENCRYPTOR', 'Danielson 1.webp'),
            name: 'Danielson Athami',
            role: 'Anggota',
        },
        {
            picture: pic('ENCRYPTOR', 'Evan Jeconia 1.webp'),
            name: 'Evan Jeconia Hansel',
            role: 'Anggota',
        },
        {
            picture: pic('ENCRYPTOR', 'Muhammad Fairuuz Bahii Syah 1.webp'),
            name: 'M. Fairuuz Bahii Syah',
            role: 'Anggota',
        },
        {
            picture: pic('ENCRYPTOR', 'Shiffa Qalbian Alfarysi 1.webp'),
            name: 'Shiffa Qalbian Alfarysi',
            role: 'Anggota',
        },
        {
            picture: pic('ENCRYPTOR', 'awang raditya 1.webp'),
            name: 'Awang Raditya Pratama',
            role: 'Anggota',
        },
        {
            picture: pic('ENCRYPTOR', 'andreas rahardian 1.webp'),
            name: 'Andreas Rahardian',
            role: 'Anggota',
        },
        {
            picture: pic('ENCRYPTOR', 'Kaizha Fauzi susanto 1.webp'),
            name: 'Kaizha Fauzi Susanto',
            role: 'Anggota',
        },
        {
            picture: pic('ENCRYPTOR', 'andre liauw 1.webp'),
            name: 'Andre Liauwnardo',
            role: 'Anggota',
        },
        {
            picture: pic('ENCRYPTOR', 'andreas prihasolo 1.webp'),
            name: 'Andreas Prihasnolo Waseso Dewo',
            role: 'Anggota',
        },
        {
            picture: pic('ENCRYPTOR', 'Cleverly Victoria 1.webp'),
            name: 'Cleverly Victori Aurselia Langitan',
            role: 'Anggota',
        },
        {
            picture: pic('ENCRYPTOR', 'Gerald Fedorian 1.webp'),
            name: 'Gerald Fedorian',
            role: 'Anggota',
        },
        {
            picture: pic('ENCRYPTOR', 'Jessiska 1.webp'),
            name: 'Jessiska',
            role: 'Anggota',
        },
        {
            picture: pic('ENCRYPTOR', 'Jesslyn Kirsten Antonia Supit 1.webp'),
            name: 'Jesslyn Kirsten Antonia Supit',
            role: 'Anggota',
        },
        {
            picture: pic('ENCRYPTOR', 'Kevin Ivan Setiadi Phang 1.webp'),
            name: 'Kevin Ivan Setiadi Phang',
            role: 'Anggota',
        },
        {
            picture: pic('ENCRYPTOR', 'kevin mikael 1.webp'),
            name: 'Kevin Mikael',
            role: 'Anggota',
        },
        {
            picture: pic('ENCRYPTOR', 'Nadine Kay Ludony 1.webp'),
            name: 'Nadine Kay Ludony',
            role: 'Anggota',
        },
        {
            picture: pic('ENCRYPTOR', 'Nathanael Aegidius Widjaja 1.webp'),
            name: 'Nathanael Aegidius Widjaja',
            role: 'Anggota',
        },
        {
            picture: pic('ENCRYPTOR', 'Rizky Mahardika Adiguna Putra 1.webp'),
            name: 'Rizky Mahardika Adiguna Putra',
            role: 'Anggota',
        },
        {
            picture: pic('ENCRYPTOR', 'Russel James Ryan 1.webp'),
            name: 'Russell James Ryan',
            role: 'Anggota',
        },
        {
            picture: pic('ENCRYPTOR', 'Wilbert Lincoln 1.webp'),
            name: 'Wilbert Lincoln',
            role: 'Anggota',
        },
    ]),

    Website: makeMembers([
        {
            picture: pic('INTERFACE', 'zian 1.webp'),
            name: 'Aditya Zianur Rahman Setiadi',
            role: 'Koordinator',
        },
        {
            picture: pic('INTERFACE', 'angela 1.webp'),
            name: 'Angela Benedictin Sunny',
            role: 'Koordinator',
        },
        {
            picture: pic('INTERFACE', 'vincent 1.webp'),
            name: 'Vincent',
            role: 'Anggota',
        },
        {
            picture: pic('INTERFACE', 'rezie 1.webp'),
            name: 'Rezie Andriano',
            role: 'Anggota',
        },
        {
            picture: pic('INTERFACE', 'marvel 1.webp'),
            name: 'Marvel Valenxius Gunawan',
            role: 'Anggota',
        },
        {
            picture: pic('INTERFACE', 'william 1.webp'),
            name: 'Willbert Budi Lian',
            role: 'Anggota',
        },
        {
            picture: pic('INTERFACE', 'eryel 1.webp'),
            name: 'Eryel Maseya',
            role: 'Anggota',
        },
        {
            picture: pic('INTERFACE', 'muhammad daniel 1.webp'),
            name: 'Muhammad Daniel A.',
            role: 'Anggota',
        },
    ]),

    Perlengkapan: makeMembers([
        {
            picture: pic('EXTENSION', 'AURICK.webp'),
            name: 'Aurick Tantyrone',
            role: 'Koordinator',
        },
        {
            picture: pic('EXTENSION', 'JOSIAH.webp'),
            name: 'Josiah Maximus Suryadi',
            role: 'Koordinator',
        },
        {
            picture: pic('EXTENSION', 'ELIGRAH.webp'),
            name: 'Eligrah Philip Mapa Kogoya',
            role: 'Anggota',
        },
        {
            picture: pic('EXTENSION', 'FAUZI.webp'),
            name: 'Fauzi Andrian',
            role: 'Anggota',
        },
        {
            picture: pic('EXTENSION', 'GEORGE.webp'),
            name: 'George Michael Sally',
            role: 'Anggota',
        },
        {
            picture: pic('EXTENSION', 'GIVEN.webp'),
            name: 'Given Julian',
            role: 'Anggota',
        },
        {
            picture: pic('EXTENSION', 'JONATHAN.webp'),
            name: 'Jonathan Andilinata',
            role: 'Anggota',
        },
        {
            picture: pic('EXTENSION', 'LUCAS.webp'),
            name: 'Lucas Stevanus Noel Siahaan',
            role: 'Anggota',
        },
        {
            picture: pic('EXTENSION', 'NELSON.webp'),
            name: 'Nelson Saputra',
            role: 'Anggota',
        },
        {
            picture: pic('EXTENSION', 'SURYA.webp'),
            name: 'Surya Nanda Destiawan',
            role: 'Anggota',
        },
    ]),

    Administrator: makeMembers([
        {
            picture: pic('ADMIN', 'Roren 1.webp'),
            name: 'Rorensia Verisca',
            role: 'Koordinator',
        },
        {
            picture: pic('ADMIN', 'Claudia 1.webp'),
            name: 'Claudia Vidya',
            role: 'Koordinator',
        },
        {
            picture: pic('ADMIN', 'Widya 1.webp'),
            name: 'Widya Ayu Safitri',
            role: 'Anggota',
        },
        {
            picture: pic('ADMIN', 'Dian 1.webp'),
            name: 'Dian Fajrina Rahmatunisa',
            role: 'Anggota',
        },
        {
            picture: pic('ADMIN', 'Aurelio 1.webp'),
            name: 'Aurelio Atthaya Suwisar',
            role: 'Anggota',
        },
        {
            picture: pic('ADMIN', 'Lexi 1.webp'),
            name: 'Lexion Rafael',
            role: 'Anggota',
        },
    ]),

    'Public Relation': makeMembers([
        {
            picture: pic('CONSOLE', 'nadine 1.webp'),
            name: 'Nadine Angeline',
            role: 'Koordinator',
        },
        {
            picture: pic('CONSOLE', 'clares 1.webp'),
            name: 'Jesslyn Claresta Sanders',
            role: 'Koordinator',
        },
        {
            picture: pic('CONSOLE', 'shifra 1.webp'),
            name: 'Shifra Massie',
            role: 'Anggota',
        },
        {
            picture: pic('CONSOLE', 'brilliant 1.webp'),
            name: 'Brilliant Timotheos Watuseke',
            role: 'Anggota',
        },
        {
            picture: pic('CONSOLE', 'kelyn 1.webp'),
            name: 'Kelyn Sorensia',
            role: 'Anggota',
        },
        {
            picture: pic('CONSOLE', 'valentino 1.webp'),
            name: 'Christian Valentino',
            role: 'Anggota',
        },
    ]),

    Dokumentasi: makeMembers([
        {
            picture: pic('SNAPSHOT', 'Abraham.webp'),
            name: 'Abraham Immanuel Soerjana',
            role: 'Koordinator',
        },
        {
            picture: pic('SNAPSHOT', 'Faathin.webp'),
            name: 'M. Faathin Naufal',
            role: 'Koordinator',
        },
        {
            picture: pic('SNAPSHOT', 'Britney.webp'),
            name: 'Britney Jessica S.',
            role: 'Anggota',
        },
        {
            picture: pic('SNAPSHOT', 'Revand.webp'),
            name: 'Revand Anrian Putra',
            role: 'Anggota',
        },
    ]),
};
export const divisionData: DivisionData[] = [
    {
        name: 'BPH',
        description:
            'Layaknya pengendali alur di balik Metaverse, Project Manager menjaga setiap divisi tetap selaras, memperkuat koordinasi, dan mengarahkan setiap langkah menuju kesuksesan PPIF 2026.',
        nameSrc: PM,
        image: PMPlain,
        members: [
            {
                picture: pic('PM', 'Alvina 1.webp'),
                name: 'Alvina',
                role: 'Ketua ',
            },
            {
                picture: pic('PM', 'Fellix.webp'),
                name: 'Fellix Fernando W. L.',
                role: 'Wakil Ketua',
            },
            {
                picture: pic('PM', 'Titus.webp'),
                name: 'Titus Ericson B.',
                role: 'Sekretaris',
            },
            {
                picture: pic('PM', 'Amanda.webp'),
                name: 'Amanda',
                role: 'Bendahara',
            },
            {
                picture: pic('PM', 'Gege.webp'),
                name: 'Gerald Alfons',
                role: 'Supervisi',
            },
        ],
        direction: 'right',
        vertical: {
            side: 'top',
            value: '35%',
        },
        left: 'clamp(88px, 23.89vh, 176px)',
        namePosition: {
            left: '22%',
            bottom: '2%',
        },
        namePositionPopup: {
            left: '12%',
            bottom: '-12%',
        },
        widthPopup: '120%',
    },
    {
        name: 'Acara',
        description:
            'Layaknya pusat ide dalam sebuah perjalanan, divisi ini memastikan setiap kegiatan berjalan lancar dan menghadirkan pengalaman yang tak terlupakan bagi seluruh peserta.',
        nameSrc: Developer,
        image: DeveloperPlain,
        members: divisionMembers.Acara,
        direction: 'left',
        vertical: {
            side: 'bottom',
            value: '6%',
        },
        left: 'clamp(248px, 67.35vh, 496px)',
        namePosition: {
            left: '23%',
            bottom: '5%',
        },
        namePositionPopup: {
            left: '10%',
            bottom: '-8%',
        },
        widthPopup: '120%',
    },
    {
        name: 'Visual',
        description:
            'Layaknya kumpulan pixel yang membentuk satu universe, divisi ini menghadirkan visual yang menarik, konsisten, dan bermakna untuk menghidupkan setiap momen PPIF 2026.',
        nameSrc: Bitmap,
        image: BitmapPlain,
        members: divisionMembers.Visual,
        direction: 'right',
        vertical: {
            side: 'top',
            value: '18%',
        },
        left: 'clamp(384px, 104.23vh, 768px)',
        namePosition: {
            left: '31%',
            bottom: '7%',
        },
        namePositionPopup: {
            left: '12%',
            bottom: '-7%',
        },
        widthPopup: '100%',
    },
    {
        name: 'Person in Charge',
        description:
            'Layaknya sebuah buku panduan dalam semesta yang terus berkembang, divisi ini menyajikan materi perkuliahan yang seru, relevan, dan mudah dipahami bagi mahasiswa baru.',
        nameSrc: Module,
        image: ModulePlain,
        members: divisionMembers['Person in Charge'],
        direction: 'left',
        vertical: {
            side: 'bottom',
            value: '8%',
        },
        left: 'clamp(544px, 147.77vh, 1088px)',
        namePosition: {
            left: '25%',
            bottom: '8%',
        },
        namePositionPopup: {
            left: '12%',
            bottom: '-6%',
        },
        widthPopup: '103%',
    },
    {
        name: 'Keamanan',
        description:
            'Layaknya lapisan enkripsi yang menjaga lintasan multiverse tetap stabil, divisi ini memastikan proses berjalan tertib serta menciptakan lingkungan yang aman dan kondusif.',
        nameSrc: Encryptor,
        image: EncryptorPlain,
        members: divisionMembers.Keamanan,
        direction: 'right',
        vertical: {
            side: 'top',
            value: '37%',
        },
        left: 'clamp(720px, 195.43vh, 1440px)',
        namePosition: {
            left: '23%',
            bottom: '5%',
        },
        namePositionPopup: {
            left: '12%',
            bottom: '-9%',
        },
        widthPopup: '118%',
    },
    {
        name: 'Website',
        description:
            'Layaknya portal menuju sebuah universe, divisi ini merancang dan mengelola website yang optimal, fungsional, dan user-friendly demi menghadirkan pengalaman digital yang mulus.',
        nameSrc: Interface,
        image: InterfacePlain,
        members: divisionMembers.Website,
        direction: 'left',
        vertical: {
            side: 'bottom',
            value: '6%',
        },
        left: 'clamp(880px, 238.86vh, 1760px)',
        namePosition: {
            left: '23%',
            bottom: '7%',
        },
        namePositionPopup: {
            left: '12%',
            bottom: '-8%',
        },
        widthPopup: '120%',
    },
    {
        name: 'Perlengkapan',
        description:
            'Layaknya sebuah extension dalam sistem multiverse, divisi ini menjadi penghubung yang menjaga kelancaran acara melalui pengelolaan perlengkapan, konsumsi, dan logistik.',
        nameSrc: Extension,
        image: ExtensionPlain,
        members: divisionMembers.Perlengkapan,
        direction: 'right',
        vertical: {
            side: 'top',
            value: '17%',
        },
        left: 'clamp(1040px, 282.29vh, 2080px)',
        namePosition: {
            left: '22%',
            bottom: '4%',
        },
        namePositionPopup: {
            left: '14%',
            bottom: '-7%',
        },
        widthPopup: '120%',
    },
    {
        name: 'Administrator',
        description:
            'Layaknya pusat koordinasi dalam semesta PPIF, divisi ini mendata mahasiswa baru, merinci setiap detail administratif, serta menjaga kerapihan data.',
        nameSrc: Admin,
        image: AdminPlain,
        members: divisionMembers.Administrator,
        direction: 'left',
        vertical: {
            side: 'bottom',
            value: '10%',
        },
        left: 'clamp(1184px, 321.49vh, 2368px)',
        namePosition: {
            left: '33%',
            bottom: '9%',
        },
        namePositionPopup: {
            left: '12%',
            bottom: '-7%',
        },
        widthPopup: '100%',
    },
    {
        name: 'Public Relation',
        description:
            'Layaknya sebuah console dalam sistem, divisi ini mengelola konten visual dan tulisan untuk membangun citra PPIF 2026 serta menjalin koneksi yang kuat dengan audiens.',
        nameSrc: Console,
        image: ConsolePlain,
        members: divisionMembers['Public Relation'],
        direction: 'right',
        vertical: {
            side: 'top',
            value: '30%',
        },
        left: 'clamp(1344px, 364.99vh, 2688px)',
        namePosition: {
            left: '25%',
            bottom: '6%',
        },
        namePositionPopup: {
            left: '12%',
            bottom: '-6%',
        },
        widthPopup: '103%',
    },
    {
        name: 'Dokumentasi',
        description:
            'Layaknya sebuah rekaman waktu di lintasan multiverse, Snapshot mengabadikan setiap momen penting dan menyimpannya sebagai kenangan yang terus hidup bagi peserta PPIF 2026.',
        nameSrc: Snapshot,
        image: SnapshotPlain,
        members: divisionMembers.Dokumentasi,
        direction: 'left',
        vertical: {
            side: 'bottom',
            value: '10%',
        },
        left: 'clamp(1520px, 412.91vh, 3040px)',
        namePosition: {
            left: '22%',
            bottom: '6%',
        },
        namePositionPopup: {
            left: '13%',
            bottom: '-5%',
        },
        widthPopup: '116%',
    },
];
