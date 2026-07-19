import AdminPlain from '@/assets/about/divisions/divLogos/AdminPlain.png';
import BitmapPlain from '@/assets/about/divisions/divLogos/BitmapPlain.png';
import ConsolePlain from '@/assets/about/divisions/divLogos/ConsolePlain.png';
import DeveloperPlain from '@/assets/about/divisions/divLogos/DeveloperPlain.png';
import EncryptorPlain from '@/assets/about/divisions/divLogos/EncryptorPlain.png';
import ExtensionPlain from '@/assets/about/divisions/divLogos/ExtensionPlain.png';
import InterfacePlain from '@/assets/about/divisions/divLogos/InterfacePlain.png';
import ModulePlain from '@/assets/about/divisions/divLogos/ModulePlain.png';
import PMPlain from '@/assets/about/divisions/divLogos/PMPlain.png';
import SnapshotPlain from '@/assets/about/divisions/divLogos/SnapshotPlain.png';
import Admin from '@/assets/about/divisions/divNames/ADMIN.svg?react';
import Bitmap from '@/assets/about/divisions/divNames/BITMAP.svg?react';
import Console from '@/assets/about/divisions/divNames/CONSOLE.svg?react';
import Developer from '@/assets/about/divisions/divNames/DEVELOPER.svg?react';
import Encryptor from '@/assets/about/divisions/divNames/ENCRYPTOR.svg?react';
import Extension from '@/assets/about/divisions/divNames/EXTENSION.svg?react';
import Interface from '@/assets/about/divisions/divNames/INTERFACE.svg?react';
import Module from '@/assets/about/divisions/divNames/MODULE.svg?react';
import PM from '@/assets/about/divisions/divNames/PM.svg?react';
import Snapshot from '@/assets/about/divisions/divNames/SNAPSHOT.svg?react';
import placeholderGuy1 from '@/assets/about/divisions/divPics/placeholderguy1.png';
import placeholderGuy2 from '@/assets/about/divisions/divPics/placeholderguy2.png';

type DivisionMember = {
    picture: string;
    name: string;
    role: string;
};

export type DivisionData = {
    name: string;
    description: string;
    NameSVG: React.ElementType;
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

const memberPicture = (index: number) =>
    index % 2 === 0 ? placeholderGuy1 : placeholderGuy2;

const shortenName = (name: string) => {
    const words = name.trim().split(/\s+/);

    if (words.length < 3) return name;

    const firstTwoWords = words.slice(0, 2);
    const shortenedRest = words.slice(2).map((word) => `${word[0]}.`);

    return [...firstTwoWords, ...shortenedRest].join(' ');
};
const makeMembers = (
    members: {
        name: string;
        role: string;
    }[],
): DivisionMember[] =>
    members.map((member, index) => ({
        picture: memberPicture(index),
        name: shortenName(member.name),
        role: member.role,
    }));

const divisionMembers = {
    Acara: makeMembers([
        { name: 'Jessy Valentine', role: 'Koordinator' },
        { name: 'William Asabha Purnamadjaja', role: 'Koordinator' },
        { name: 'Muhammad Ashfa', role: 'Anggota' },
        { name: 'Ritz Kevin Heryanto', role: 'Anggota' },
        { name: 'Jonah Matthew Santoso', role: 'Anggota' },
        { name: 'Desslyn Marcela', role: 'Anggota' },
    ]),

    Visual: makeMembers([
        { name: 'Alfred Wilson Kwan', role: 'Koordinator' },
        { name: 'Vanessa Laurensia', role: 'Koordinator' },
        { name: 'Dhita Paramita Citra', role: 'Anggota' },
        { name: 'Daniel Kurnia Gunawan', role: 'Anggota' },
        { name: 'Riani Freefina Arifin', role: 'Anggota' },
        { name: 'Eldo Sanders', role: 'Anggota' },
    ]),

    'Person in Charge': makeMembers([
        { name: 'Dheryl Christofer Yahya', role: 'Koordinator' },
        { name: 'Sebastian Benaya', role: 'Koordinator' },
        { name: 'Sielyne Dwi Putri', role: 'Koordinator' },
        { name: 'Sindhi Ananta', role: 'Anggota' },
        { name: 'Jonathan Kent Wijaya', role: 'Anggota' },
        { name: 'Carlos Limanto', role: 'Anggota' },
        { name: 'Devyna Dhamawany Kusuma', role: 'Anggota' },
        { name: 'Muhammad Reivan Febriano', role: 'Anggota' },
        { name: 'Steven Ong Gunawan', role: 'Anggota' },
        { name: 'Andika Syahfutra', role: 'Anggota' },
        { name: 'Dimas Pradhitya', role: 'Anggota' },
        {
            name: 'Christopher Yogiswara Leandro Sandyajati',
            role: 'Anggota',
        },
        { name: 'Gavin Tanzil', role: 'Anggota' },
        { name: 'Dustin Nathaniel Bernadi', role: 'Anggota' },
        { name: 'Rivera Manuela Tamba', role: 'Anggota' },
        { name: 'Yoga Valentino Samputra', role: 'Anggota' },
        { name: 'Muhammad Rassya', role: 'Anggota' },
        { name: 'Christian Surya Themadja', role: 'Anggota' },
        { name: 'Michael Sahala', role: 'Anggota' },
    ]),

    Keamanan: makeMembers([
        { name: 'Muhandis Jundi Rabbani', role: 'Koordinator' },
        { name: 'Victor Chandra', role: 'Koordinator' },
        { name: 'Clifton Adriel Surya', role: 'Anggota' },
        { name: 'Danielson Athami', role: 'Anggota' },
        { name: 'Evan Jeconia Hansel', role: 'Anggota' },
        { name: 'Muhammad Fairuuz Bahii Syah', role: 'Anggota' },
        { name: 'Shiffa Qalbian Alfarysi', role: 'Anggota' },
        { name: 'Awang Raditya Pratama', role: 'Anggota' },
        { name: 'Andreas Rahardian', role: 'Anggota' },
        { name: 'Kaizha Fauzi Susanto', role: 'Anggota' },
        { name: 'Andre Liauwnardo', role: 'Anggota' },
        { name: 'Andreas Prihasnolo Waseso Dewo', role: 'Anggota' },
        {
            name: 'Cleverly Victori Aurselia Langitan',
            role: 'Anggota',
        },
        { name: 'Gerald Fedorian', role: 'Anggota' },
        { name: 'Jessiska', role: 'Anggota' },
        { name: 'Jesslyn Kirsten Antonia Supit', role: 'Anggota' },
        { name: 'Kevin Ivan Setiadi Phang', role: 'Anggota' },
        { name: 'Kevin Mikael', role: 'Anggota' },
        { name: 'Nadine Kay Ludony', role: 'Anggota' },
        { name: 'Nathanael Aegidius Widjaja', role: 'Anggota' },
        { name: 'Rizky Mahardika Adiguna Putra', role: 'Anggota' },
        { name: 'Roane Adzani Sukmayadi Jaya Putra', role: 'Anggota' },
        { name: 'Russell James Ryan', role: 'Anggota' },
        { name: 'Wilbert Lincoln', role: 'Anggota' },
        { name: 'Cecilia Wijaya', role: 'Koordinator' },
    ]),

    Website: makeMembers([
        { name: 'Aditya Zianur Rahman Setiadi', role: 'Koordinator' },
        { name: 'Angela Benedictin Sunny', role: 'Koordinator' },
        { name: 'Vincent', role: 'Anggota' },
        { name: 'Rezie Andriano', role: 'Anggota' },
        { name: 'Marvel Valenxius Gunawan', role: 'Anggota' },
        { name: 'Willbert Budi Lian', role: 'Anggota' },
        { name: 'Eryel Maseya', role: 'Anggota' },
        { name: 'Muhammad Daniel Azmi', role: 'Anggota' },
    ]),

    Perlengkapan: makeMembers([
        { name: 'Aurick Tantyrone', role: 'Koordinator' },
        { name: 'Josiah Maximus Suryadi', role: 'Koordinator' },
        { name: 'Eligrah Philip Mapa Kogoya', role: 'Anggota' },
        { name: 'Fauzi Andrian', role: 'Anggota' },
        { name: 'George Michael Sally', role: 'Anggota' },
        { name: 'Given Julian', role: 'Anggota' },
        { name: 'Jonathan Andilinata', role: 'Anggota' },
        { name: 'Lucas Stevanus Noel Siahaan', role: 'Anggota' },
        { name: 'Nelson Saputra', role: 'Anggota' },
        { name: 'Surya Nanda Destiawan', role: 'Anggota' },
    ]),

    Administrator: makeMembers([
        { name: 'Rorensia Verisca', role: 'Koordinator' },
        { name: 'Claudia Vidya', role: 'Koordinator' },
        { name: 'Widya Ayu Safitri', role: 'Anggota' },
        { name: 'Dian Fajrina Rahmatunisa', role: 'Anggota' },
        { name: 'Aurelio Atthaya Suwisar', role: 'Anggota' },
        { name: 'Lexion Rafael', role: 'Anggota' },
    ]),

    'Public Relation': makeMembers([
        { name: 'Nadine Angeline', role: 'Koordinator' },
        { name: 'Jesslyn Claresta Sanders', role: 'Koordinator' },
        { name: 'Shifra Massie', role: 'Anggota' },
        { name: 'Brilliant Timotheos Watuseke', role: 'Anggota' },
        { name: 'Kelyn Sorensia', role: 'Anggota' },
        { name: 'Christian Valentino', role: 'Anggota' },
    ]),

    Dokumentasi: makeMembers([
        { name: 'Abraham Immanuel Soerjana', role: 'Koordinator' },
        { name: 'Muhammad Faathin Naufal', role: 'Koordinator' },
        { name: 'Britney Jessica', role: 'Anggota' },
        { name: 'Revand Anrian Putra', role: 'Anggota' },
    ]),
};
export const divisionData: DivisionData[] = [
    {
        name: 'BPH',
        description:
            'Bertanggung jawab mengoordinasikan seluruh alur kerja kepanitiaan, menjaga komunikasi antar divisi, mengatur timeline, serta memastikan setiap kegiatan berjalan sesuai rencana.',
        NameSVG: PM,
        image: PMPlain,
        members: [
            {
                picture: placeholderGuy1,
                name: 'Alvina',
                role: 'Ketua ',
            },
            {
                picture: placeholderGuy2,
                name: 'Fellix Fernando W. L.',
                role: 'Wakil Ketua',
            },
            {
                picture: placeholderGuy2,
                name: 'Titus Ericson B.',
                role: 'Sekretaris',
            },
            {
                picture: placeholderGuy1,
                name: 'Amanda',
                role: 'Bendahara',
            },
        ],
        direction: 'right',
        vertical: {
            side: 'top',
            value: '35%',
        },
        left: '11rem',
        namePosition: {
            left: '22%',
            bottom: '2%',
        },
        namePositionPopup: {
            left: '2%',
            bottom: '-12%',
        },
        widthPopup: '120%',
    },
    {
        name: 'Acara',
        description:
            'Merancang konsep acara, menyusun rundown, mengatur jalannya kegiatan, serta memastikan setiap sesi acara dapat berjalan dengan tertib, menarik, dan sesuai tujuan.',
        NameSVG: Developer,
        image: DeveloperPlain,
        members: divisionMembers.Acara,
        direction: 'left',
        vertical: {
            side: 'bottom',
            value: '6%',
        },
        left: '31rem',
        namePosition: {
            left: '23%',
            bottom: '5%',
        },
        namePositionPopup: {
            left: '0%',
            bottom: '-11%',
        },
        widthPopup: '120%',
    },
    {
        name: 'Visual',
        description:
            'Membuat kebutuhan visual acara, mulai dari aset grafis, ilustrasi, hingga elemen desain yang memperkuat identitas dan suasana kegiatan.',
        NameSVG: Bitmap,
        image: BitmapPlain,
        members: divisionMembers.Visual,
        direction: 'right',
        vertical: {
            side: 'top',
            value: '18%',
        },
        left: '48rem',
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
            'Menjadi penghubung dan penanggung jawab teknis untuk pihak atau kelompok tertentu, memastikan kebutuhan terkoordinasi dengan baik selama kegiatan berlangsung.',
        NameSVG: Module,
        image: ModulePlain,
        members: divisionMembers['Person in Charge'],
        direction: 'left',
        vertical: {
            side: 'bottom',
            value: '8%',
        },
        left: '68rem',
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
            'Menjaga ketertiban dan keamanan selama kegiatan, mengatur alur peserta, serta membantu memastikan lingkungan acara tetap aman dan kondusif.',
        NameSVG: Encryptor,
        image: EncryptorPlain,
        members: divisionMembers.Keamanan,
        direction: 'right',
        vertical: {
            side: 'top',
            value: '37%',
        },
        left: '90rem',
        namePosition: {
            left: '23%',
            bottom: '5%',
        },
        namePositionPopup: {
            left: '5%',
            bottom: '-9%',
        },
        widthPopup: '118%',
    },
    {
        name: 'Website',
        description:
            'Mengembangkan dan mengelola kebutuhan website acara, mulai dari tampilan, fitur, hingga pengalaman pengguna agar informasi dapat diakses dengan jelas.',
        NameSVG: Interface,
        image: InterfacePlain,
        members: divisionMembers.Website,
        direction: 'left',
        vertical: {
            side: 'bottom',
            value: '6%',
        },
        left: '110rem',
        namePosition: {
            left: '23%',
            bottom: '7%',
        },
        namePositionPopup: {
            left: '0%',
            bottom: '-8%',
        },
        widthPopup: '120%',
    },
    {
        name: 'Perlengkapan',
        description:
            'Menyiapkan, mengatur, dan memastikan seluruh perlengkapan yang dibutuhkan acara tersedia, tertata, serta siap digunakan sesuai kebutuhan.',
        NameSVG: Extension,
        image: ExtensionPlain,
        members: divisionMembers.Perlengkapan,
        direction: 'right',
        vertical: {
            side: 'top',
            value: '17%',
        },
        left: '130rem',
        namePosition: {
            left: '22%',
            bottom: '4%',
        },
        namePositionPopup: {
            left: '0%',
            bottom: '-10%',
        },
        widthPopup: '120%',
    },
    {
        name: 'Administrator',
        description:
            'Mengelola kebutuhan administrasi acara, menyusun data penting, mencatat informasi, serta membantu kelancaran koordinasi internal kepanitiaan.',
        NameSVG: Admin,
        image: AdminPlain,
        members: divisionMembers.Administrator,
        direction: 'left',
        vertical: {
            side: 'bottom',
            value: '10%',
        },
        left: '148rem',
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
            'Menjalin komunikasi dengan pihak eksternal, menyampaikan informasi acara, membangun relasi, serta membantu menjaga citra kegiatan di hadapan publik.',
        NameSVG: Console,
        image: ConsolePlain,
        members: divisionMembers['Public Relation'],
        direction: 'right',
        vertical: {
            side: 'top',
            value: '30%',
        },
        left: '168rem',
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
            'Mendokumentasikan momen penting selama kegiatan melalui foto dan video, serta menyimpan hasil dokumentasi sebagai arsip dan publikasi acara.',
        NameSVG: Snapshot,
        image: SnapshotPlain,
        members: divisionMembers.Dokumentasi,
        direction: 'left',
        vertical: {
            side: 'bottom',
            value: '10%',
        },
        left: '190rem',
        namePosition: {
            left: '22%',
            bottom: '6%',
        },
        namePositionPopup: {
            left: '6%',
            bottom: '-6%',
        },
        widthPopup: '116%',
    },
];
