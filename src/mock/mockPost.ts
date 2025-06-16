import pic from "../views/assets/mimi.jpg";
import pic1 from "../views/assets/nay.jpg";
import pic2 from "../views/assets/twice1.png";


export type Post = {
    postId: number;
    images: string[];
    title: string;
    type: string;
    province: string;
    description: string;
};

const mockPosts: Post[] = [
    {
        postId: 1,
        images: [pic, pic1, pic2,pic1, pic2,pic1, pic2,],
        title: "ร้านอาหารน่านั่ง",
        type: "ร้านอาหาร",
        province: "กรุงเทพมหานคร",
        description: "บรรยากาศดี อาหารอร่อย",
    },
    {
        postId: 2,
        images: [pic1, pic2],
        title: "ภูเขาสวย",
        type: "สถานที่ท่องเที่ยว",
        province: "เชียงใหม่",
        description: "เหมาะกับการถ่ายรูป",
    },
    {
        postId: 3,
        images: [pic2, pic],
        title: "โรงแรมริมทะเล",
        type: "โรงแรม",
        province: "ภูเก็ต",
        description: "วิวสวยติดทะเล",
    },
    {
        postId: 4,
        images: [pic2, pic1],
        title: "คาเฟ่สุดชิค",
        type: "ร้านอาหาร",
        province: "กรุงเทพมหานคร",
        description: "กาแฟหอม อาหารว่างอร่อย",
    },
    {
        postId: 5,
        images: [pic, pic2],
        title: "สวนสาธารณะกลางเมือง",
        type: "สถานที่ท่องเที่ยว",
        province: "กรุงเทพมหานคร",
        description: "เหมาะสำหรับพักผ่อนและออกกำลังกาย",
    },
    {
        postId: 6,
        images: [pic1, pic],
        title: "ตลาดนัดกลางคืน",
        type: "ร้านอาหาร",
        province: "กรุงเทพมหานคร",
        description: "ของกินเพียบ บรรยากาศสนุกสนาน",
    },
    {
        postId: 7,
        images: [pic2, pic1],
        title: "พิพิธภัณฑ์ศิลปะ",
        type: "สถานที่ท่องเที่ยว",
        province: "เชียงใหม่",
        description: "งานศิลปะสวยงาม น่าสนใจ",
    },
    {
        postId: 8,
        images: [pic, pic2],
        title: "หาดทรายขาว",
        type: "สถานที่ท่องเที่ยว",
        province: "กระบี่",
        description: "น้ำใส ทรายขาว สวยงาม",
    },
    {
        postId: 9,
        images: [pic1, pic],
        title: "ร้านกาแฟริมแม่น้ำ",
        type: "ร้านอาหาร",
        province: "กรุงเทพมหานคร",
        description: "บรรยากาศดี เหมาะสำหรับนั่งชิล",
    },
    {
        postId: 10,
        images: [pic2, pic1],
        title: "สวนดอกไม้สวยงาม",
        type: "สถานที่ท่องเที่ยว",
        province: "เชียงใหม่",
        description: "ดอกไม้หลากสีสัน สวยงามมาก",
    },
    {
        postId: 11,
        images: [pic, pic1],
        title: "ร้านเบเกอรี่สุดน่ารัก",
        type: "ร้านอาหาร",
        province: "กรุงเทพมหานคร",
        description: "ขนมหวานอร่อย บรรยากาศน่ารัก",
    },
    {
        postId: 12,
        images: [pic2, pic],
        title: "สถานที่ท่องเที่ยวทางประวัติศาสตร์",
        type: "สถานที่ท่องเที่ยว",
        province: "อยุธยา",
        description: "เรียนรู้ประวัติศาสตร์ไทย",
    },
    {
        postId: 13,
        images: [pic1, pic2],
        title: "ร้านอาหารทะเลสด",
        type: "ร้านอาหาร",
        province: "ชลบุรี",
        description: "อาหารทะเลสดใหม่ อร่อยมาก",
    },
    {
        postId: 14,
        images: [],
        title: "คาเฟ่สไตล์วินเทจ",
        type: "ร้านอาหาร",
        province: "กรุงเทพมหานคร",
        description: "บรรยากาศวินเทจ นั่งสบาย",
    },
    {
        postId: 15,
        images: [pic2, pic],
        title: "ห้องสมุดกลางเมือง",
        type: "สถานที่ท่องเที่ยว",
        province: "กรุงเทพมหานคร",
        description: "สถานที่เงียบสงบสำหรับอ่านหนังสือ",
    },
    // ... ทำแบบเดียวกันกับโพสอื่นๆ
];

export default mockPosts;
