import type { ComponentType, SVGProps } from 'react';

import BriefingDayHeader from '@/assets/timeline/briefingdayheadersvg.svg?react';
import BriefingDayAboutTitle from '@/assets/timeline/briefingdaysvg.svg?react';
import DdayTitle from '@/assets/timeline/ddaysvg.svg?react';
import DdayHeader from '@/assets/timeline/ddaysvgheader.svg?react';

import baju from '@/assets/timeline/baju.webp';
import baju2 from '@/assets/timeline/baju2.webp';
import bekal from '@/assets/timeline/bekal.webp';
import buku from '@/assets/timeline/book.webp';
import gadget from '@/assets/timeline/gadget.webp';
import tas from '@/assets/timeline/tas.webp';

type TimelineView = 1 | 2;

type TimelineInfoName = 'D-Day' | 'BriefingDay';

type SVGComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type TimelineInformation = {
    name: TimelineInfoName;
    header: SVGComponent;
    headerClassName: string;
    aboutTitle: SVGComponent;
    modalTitle: string;
    informationDisplayed: string;
    modalDescription: string;
    images: string[];
};

export const timelineInformation: Record<TimelineView, TimelineInformation> = {
    1: {
        name: 'D-Day',
        header: DdayHeader,
        headerClassName: '!w-[20vmin]',
        aboutTitle: DdayTitle,
        modalTitle: 'About D-Day',
        informationDisplayed:
            'D-Day merupakan hari kedua dari rangkaian PPIF yang berisi kegiatan utama dari keseluruhan PPIF 2026. Pada hari ini, peserta akan mengikuti kegiatan yang telah dipersiapkan oleh panitia. Seluruh peserta diharapkan hadir tepat waktu dan membawa kelengkapan yang sudah diberitahukan pada briefing day. ',
        modalDescription:
            'D-Day merupakan puncak dari seluruh rangkaian kegiatan yang telah dipersiapkan sebelumnya. Pada hari ini, peserta akan mengikuti berbagai agenda utama sesuai dengan susunan acara yang telah ditentukan oleh panitia. Setiap peserta diwajibkan hadir tepat waktu, membawa seluruh perlengkapan yang dibutuhkan, serta mengikuti arahan panitia selama acara berlangsung. Melalui D-Day, peserta akan mendapatkan kesempatan untuk mengenal lebih dekat lingkungan dan sesama mahasiswa Informatika, serta menjalin relasi dengan teman-teman baru melalui berbagai kegiatan yang telah disiapkan. Peserta juga akan mendapatkan informasi dan mengenal lebih dalam mengenai perkuliahan Informatika di UMN, termasuk berbagai organisasi dan kegiatan yang dapat diikuti selama masa perkuliahan. Selain itu, peserta juga dapat berinteraksi dan bertanya secara langsung kepada panitia mengenai pengalaman serta kehidupan perkuliahan di Informatika UMN.',
        images: [baju2, tas, buku, bekal],
    },

    2: {
        name: 'BriefingDay',
        header: BriefingDayHeader,
        headerClassName: 'h-auto w-[100%] ',
        aboutTitle: BriefingDayAboutTitle,
        modalTitle: 'About Briefing Day',
        informationDisplayed:
            'Briefing Day merupakan sesi informasi yang diadakan secara daring sebelum pelaksanaan D-Day PPIF 2026. Peserta akan menerima penjelasan mengenai aturan, jadwal, dan hal-hal yang perlu dipersiapkan untuk mengikuti kegiatan D-Day nantinya. Selain itu, panitia juga akan menyampaikan pembagian kelompok serta tanggung jawab yang perlu diperhatikan oleh setiap peserta.',
        modalDescription:
            'Briefing Day diselenggarakan sebagai sesi persiapan sebelum peserta mengikuti kegiatan utama pada D-Day. Dalam sesi ini, panitia akan memberikan penjelasan lengkap mengenai jadwal, lokasi, aturan, pembagian kelompok, serta alur kegiatan yang harus diikuti. Peserta akan mendapatkan kesempatan untuk memahami tanggung jawab masing-masing dan menanyakan informasi yang masih belum jelas. Seluruh perubahan atau informasi tambahan mengenai pelaksanaan acara juga akan disampaikan pada sesi briefing day. Oleh karena itu, setiap peserta diharapkan hadir tepat waktu dan mencatat seluruh penjelasan dari panitia. Dengan mengikuti Briefing Day, peserta dapat mempersiapkan diri dengan lebih baik dan mengurangi kemungkinan terjadinya kesalahan atau kebingungan saat acara utama berlangsung.',
        images: [baju, buku, gadget],
    },
};
