const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("\n🌱 Bắt đầu seed dữ liệu sách...\n");

  // 1) Danh mục
  console.log("📚 Tạo danh mục...");
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "sach-thieu-nhi" },
      update: {},
      create: {
        name: "Sách Thiếu Nhi",
        slug: "sach-thieu-nhi",
        description: "Sách dành cho trẻ em và thiếu niên",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800",
      },
    }),
    prisma.category.upsert({
      where: { slug: "van-hoc" },
      update: {},
      create: {
        name: "Văn Học",
        slug: "van-hoc",
        description: "Tiểu thuyết, truyện ngắn, thơ ca",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800",
      },
    }),
    prisma.category.upsert({
      where: { slug: "kinh-te" },
      update: {},
      create: {
        name: "Kinh Tế",
        slug: "kinh-te",
        description: "Sách về kinh doanh, đầu tư, quản lý",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800",
      },
    }),
    prisma.category.upsert({
      where: { slug: "ky-nang-song" },
      update: {},
      create: {
        name: "Kỹ Năng Sống",
        slug: "ky-nang-song",
        description: "Phát triển bản thân, tư duy, giao tiếp",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
      },
    }),
    prisma.category.upsert({
      where: { slug: "khoa-hoc-cong-nghe" },
      update: {},
      create: {
        name: "Khoa Học - Công Nghệ",
        slug: "khoa-hoc-cong-nghe",
        description: "Sách về khoa học, công nghệ, lập trình",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
      },
    }),
  ]);
  console.log(`✅ Đã tạo ${categories.length} danh mục\n`);

  // 2) Tác giả (mở rộng)
  console.log("✍️  Tạo tác giả...");
  const authors = await Promise.all([
    prisma.author.upsert({
      where: { slug: "nguyen-nhat-anh" },
      update: {},
      create: {
        name: "Nguyễn Nhật Ánh",
        slug: "nguyen-nhat-anh",
        biography:
          "Nhà văn nổi tiếng Việt Nam với nhiều tác phẩm văn học thiếu nhi được yêu thích.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      },
    }),
    prisma.author.upsert({
      where: { slug: "dale-carnegie" },
      update: {},
      create: {
        name: "Dale Carnegie",
        slug: "dale-carnegie",
        biography:
          "Tác giả nổi tiếng người Mỹ về phát triển bản thân và kỹ năng giao tiếp.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      },
    }),
    prisma.author.upsert({
      where: { slug: "haruki-murakami" },
      update: {},
      create: {
        name: "Haruki Murakami",
        slug: "haruki-murakami",
        biography:
          "Tiểu thuyết gia Nhật Bản nổi tiếng thế giới với phong cách viết độc đáo.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      },
    }),
    prisma.author.upsert({
      where: { slug: "tony-buoi-sang" },
      update: {},
      create: {
        name: "Tony Buổi Sáng",
        slug: "tony-buoi-sang",
        biography:
          "Tác giả nổi tiếng về lĩnh vực kinh doanh và kỹ năng sống tại Việt Nam.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      },
    }),
    prisma.author.upsert({
      where: { slug: "nguyen-ngoc-tu" },
      update: {},
      create: {
        name: "Nguyễn Ngọc Tư",
        slug: "nguyen-ngoc-tu",
        biography: "Nhà văn Việt Nam với nhiều tác phẩm văn học đương đại.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      },
    }),
    prisma.author.upsert({
      where: { slug: "robin-sharma" },
      update: {},
      create: {
        name: "Robin Sharma",
        slug: "robin-sharma",
        biography: "Tác giả Canada về lãnh đạo và phát triển cá nhân.",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
      },
    }),
    prisma.author.upsert({
      where: { slug: "yuval-noah-harari" },
      update: {},
      create: {
        name: "Yuval Noah Harari",
        slug: "yuval-noah-harari",
        biography: "Sử gia Israel, tác giả của Sapiens và Homo Deus.",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
      },
    }),
    prisma.author.upsert({
      where: { slug: "j-k-rowling" },
      update: {},
      create: {
        name: "J.K. Rowling",
        slug: "j-k-rowling",
        biography:
          "Tác giả người Anh của series Harry Potter nổi tiếng thế giới.",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
      },
    }),
    prisma.author.upsert({
      where: { slug: "roald-dahl" },
      update: {},
      create: {
        name: "Roald Dahl",
        slug: "roald-dahl",
        biography:
          "Nhà văn người Anh nổi tiếng với các tác phẩm thiếu nhi độc đáo.",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
      },
    }),
    prisma.author.upsert({
      where: { slug: "paulo-coelho" },
      update: {},
      create: {
        name: "Paulo Coelho",
        slug: "paulo-coelho",
        biography: "Nhà văn Brazil, tác giả của Nhà giả kim.",
        avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400",
      },
    }),
  ]);
  console.log(`✅ Đã tạo ${authors.length} tác giả\n`);

  // 3) Sách (25+ quyển)
  console.log("📖 Tạo sách...");
  const books = [
    // Văn học Việt Nam
    {
      title: "Mắt Biếc",
      slug: "mat-biec",
      description:
        "Câu chuyện tình đầu trong sáng và đầy cảm động của Ngạn và Hà Lan.",
      price: 95000,
      originalPrice: 120000,
      stock: 150,
      publishYear: 1990,
      publisher: "Nhà xuất bản Trẻ",
      pages: 256,
      isbn: "978-604-1-00001-1",
      coverImage:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600",
      isFeatured: true,
      authorId: authors[0].id,
      categoryId: categories[1].id,
    },
    {
      title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
      slug: "toi-thay-hoa-vang-tren-co-xanh",
      description:
        "Tuổi thơ của hai anh em Thiều và Tường với những kỷ niệm đẹp và nỗi buồn chia ly.",
      price: 105000,
      originalPrice: 135000,
      stock: 200,
      publishYear: 2010,
      publisher: "Nhà xuất bản Trẻ",
      pages: 368,
      isbn: "978-604-1-00002-8",
      coverImage:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
      isFeatured: true,
      authorId: authors[0].id,
      categoryId: categories[0].id,
    },
    {
      title: "Cho Tôi Xin Một Vé Đi Tuổi Thơ",
      slug: "cho-toi-xin-mot-ve-di-tuoi-tho",
      description:
        "Những câu chuyện về tuổi thơ đầy hoài niệm và cảm xúc của Nguyễn Nhật Ánh.",
      price: 89000,
      originalPrice: 110000,
      stock: 120,
      publishYear: 2014,
      publisher: "Nhà xuất bản Trẻ",
      pages: 324,
      isbn: "978-604-1-00015-8",
      coverImage:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600",
      isFeatured: false,
      authorId: authors[0].id,
      categoryId: categories[0].id,
    },
    {
      title: "Cánh Đồng Bất Tận",
      slug: "canh-dong-bat-tan",
      description:
        "Tiểu thuyết về cuộc sống miền Tây sông nước đầy chất thơ của Nguyễn Ngọc Tư.",
      price: 92000,
      stock: 80,
      publishYear: 2005,
      publisher: "Nhà xuất bản Hội Nhà Văn",
      pages: 280,
      isbn: "978-604-1-00020-2",
      coverImage:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
      isFeatured: false,
      authorId: authors[4].id,
      categoryId: categories[1].id,
    },

    // Kỹ năng sống
    {
      title: "Đắc Nhân Tâm",
      slug: "dac-nhan-tam",
      description:
        "Cuốn sách kinh điển về nghệ thuật giao tiếp và tạo dựng mối quan hệ.",
      price: 86000,
      originalPrice: 110000,
      stock: 300,
      publishYear: 1936,
      publisher: "Nhà xuất bản Tổng Hợp",
      pages: 320,
      isbn: "978-604-1-00003-5",
      coverImage:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600",
      isFeatured: true,
      authorId: authors[1].id,
      categoryId: categories[3].id,
    },
    {
      title: "Nghệ Thuật Bán Hàng Vĩ Đại Nhất Thế Giới",
      slug: "nghe-thuat-ban-hang-vi-dai-nhat-the-gioi",
      description:
        "Những bài học cốt lõi về nghệ thuật thuyết phục và bán hàng.",
      price: 78000,
      stock: 150,
      publishYear: 1968,
      publisher: "Nhà xuất bản Lao Động",
      pages: 256,
      isbn: "978-604-1-00025-7",
      coverImage:
        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600",
      isFeatured: false,
      authorId: authors[1].id,
      categoryId: categories[3].id,
    },
    {
      title: "5 Giờ Sáng Câu Lạc Bộ",
      slug: "5-gio-sang-cau-lac-bo",
      description:
        "Phương pháp thay đổi cuộc sống bằng cách thức dậy sớm và tận dụng thời gian hiệu quả.",
      price: 115000,
      originalPrice: 145000,
      stock: 200,
      publishYear: 2018,
      publisher: "Nhà xuất bản Thế Giới",
      pages: 368,
      isbn: "978-604-1-00030-1",
      coverImage:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600",
      isFeatured: true,
      authorId: authors[5].id,
      categoryId: categories[3].id,
    },

    // Văn học nước ngoài
    {
      title: "Rừng Na Uy",
      slug: "rung-na-uy",
      description:
        "Câu chuyện tình yêu đan xen với nỗi buồn và cô đơn của tuổi trẻ.",
      price: 125000,
      originalPrice: 160000,
      stock: 100,
      publishYear: 1987,
      publisher: "Nhà xuất bản Hội Nhà Văn",
      pages: 448,
      isbn: "978-604-1-00004-2",
      coverImage:
        "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=600",
      isFeatured: false,
      authorId: authors[2].id,
      categoryId: categories[1].id,
    },
    {
      title: "Kafka Bên Bờ Biển",
      slug: "kafka-ben-bo-bien",
      description:
        "Tiểu thuyết siêu thực kết hợp giữa thế giới hiện đại và huyền ảo.",
      price: 135000,
      stock: 90,
      publishYear: 2002,
      publisher: "Nhà xuất bản Hội Nhà Văn",
      pages: 520,
      isbn: "978-604-1-00035-6",
      coverImage:
        "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600",
      isFeatured: false,
      authorId: authors[2].id,
      categoryId: categories[1].id,
    },
    {
      title: "Nhà Giả Kim",
      slug: "nha-gia-kim",
      description:
        "Hành trình tìm kiếm kho báu và ý nghĩa cuộc sống của chàng chăn cừu Santiago.",
      price: 79000,
      originalPrice: 99000,
      stock: 250,
      publishYear: 1988,
      publisher: "Nhà xuất bản Hội Nhà Văn",
      pages: 227,
      isbn: "978-604-1-00040-0",
      coverImage:
        "https://images.unsplash.com/photo-1509266272358-7701da638078?w=600",
      isFeatured: true,
      authorId: authors[9].id,
      categoryId: categories[1].id,
    },

    // Kinh tế - Khởi nghiệp
    {
      title: "Trên Đường Băng",
      slug: "tren-duong-bang",
      description:
        "Những bài học kinh doanh và khởi nghiệp từ trải nghiệm của Tony Buổi Sáng.",
      price: 98000,
      originalPrice: 125000,
      stock: 180,
      publishYear: 2015,
      publisher: "Nhà xuất bản Thế Giới",
      pages: 280,
      isbn: "978-604-1-00005-9",
      coverImage:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600",
      isFeatured: true,
      authorId: authors[3].id,
      categoryId: categories[2].id,
    },
    {
      title: "Tôi Tài Giỏi Bạn Cũng Thế",
      slug: "toi-tai-gioi-ban-cung-the",
      description:
        "Kích hoạt tiềm năng bản thân và đạt thành công trong học tập, công việc.",
      price: 88000,
      stock: 160,
      publishYear: 2017,
      publisher: "Nhà xuất bản Thế Giới",
      pages: 312,
      isbn: "978-604-1-00045-5",
      coverImage:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600",
      isFeatured: false,
      authorId: authors[3].id,
      categoryId: categories[2].id,
    },

    // Khoa học - Công nghệ
    {
      title: "Sapiens: Lược Sử Loài Người",
      slug: "sapiens-luoc-su-loai-nguoi",
      description:
        "Lịch sử tiến hoá của loài người từ đồ đá đến kỷ nguyên công nghệ.",
      price: 189000,
      originalPrice: 220000,
      stock: 140,
      publishYear: 2011,
      publisher: "Nhà xuất bản Thế Giới",
      pages: 512,
      isbn: "978-604-1-00050-9",
      coverImage:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600",
      isFeatured: true,
      authorId: authors[6].id,
      categoryId: categories[4].id,
    },
    {
      title: "Homo Deus: Lược Sử Tương Lai",
      slug: "homo-deus-luoc-su-tuong-lai",
      description: "Những dự báo về tương lai của nhân loại trong thế kỷ 21.",
      price: 179000,
      stock: 110,
      publishYear: 2015,
      publisher: "Nhà xuất bản Thế Giới",
      pages: 464,
      isbn: "978-604-1-00055-4",
      coverImage:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
      isFeatured: false,
      authorId: authors[6].id,
      categoryId: categories[4].id,
    },

    // Thiếu nhi
    {
      title: "Harry Potter Và Hòn Đá Phù Thủy",
      slug: "harry-potter-va-hon-da-phu-thuy",
      description:
        "Cuốn sách đầu tiên trong series Harry Potter nổi tiếng toàn cầu.",
      price: 125000,
      originalPrice: 155000,
      stock: 220,
      publishYear: 1997,
      publisher: "Nhà xuất bản Trẻ",
      pages: 352,
      isbn: "978-604-1-00060-8",
      coverImage:
        "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=600",
      isFeatured: true,
      authorId: authors[7].id,
      categoryId: categories[0].id,
    },
    {
      title: "Harry Potter Và Phòng Chứa Bí Mật",
      slug: "harry-potter-va-phong-chua-bi-mat",
      description:
        "Phần hai với nhiều bí ẩn và chuyến phiêu lưu gay cấn tại Hogwarts.",
      price: 135000,
      stock: 200,
      publishYear: 1998,
      publisher: "Nhà xuất bản Trẻ",
      pages: 384,
      isbn: "978-604-1-00065-3",
      coverImage:
        "https://images.unsplash.com/photo-1589998059171-988d887df646?w=600",
      isFeatured: false,
      authorId: authors[7].id,
      categoryId: categories[0].id,
    },
    {
      title: "Charlie Và Nhà Máy Sô Cô La",
      slug: "charlie-va-nha-may-so-co-la",
      description:
        "Câu chuyện kỳ diệu về cậu bé Charlie và nhà máy sô-cô-la của Willy Wonka.",
      price: 95000,
      originalPrice: 115000,
      stock: 180,
      publishYear: 1964,
      publisher: "Nhà xuất bản Kim Đồng",
      pages: 208,
      isbn: "978-604-1-00070-7",
      coverImage:
        "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600",
      isFeatured: true,
      authorId: authors[8].id,
      categoryId: categories[0].id,
    },
    {
      title: "Matilda",
      slug: "matilda",
      description:
        "Cô bé Matilda thông minh với khả năng đặc biệt và trái tim ấm áp.",
      price: 89000,
      stock: 150,
      publishYear: 1988,
      publisher: "Nhà xuất bản Kim Đồng",
      pages: 256,
      isbn: "978-604-1-00075-2",
      coverImage:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600",
      isFeatured: false,
      authorId: authors[8].id,
      categoryId: categories[0].id,
    },
    {
      title: "James Và Quả Đào Khổng Lồ",
      slug: "james-va-qua-dao-khong-lo",
      description:
        "Cuộc phiêu lưu kỳ thú của James bên trong quả đào khổng lồ.",
      price: 85000,
      stock: 140,
      publishYear: 1961,
      publisher: "Nhà xuất bản Kim Đồng",
      pages: 192,
      isbn: "978-604-1-00080-6",
      coverImage:
        "https://images.unsplash.com/photo-1544716278-e513176f20b5?w=600",
      isFeatured: false,
      authorId: authors[8].id,
      categoryId: categories[0].id,
    },

    // Thêm đa dạng
    {
      title: "Tuổi Thơ Dữ Dội",
      slug: "tuoi-tho-du-doi",
      description:
        "Tập truyện về tuổi thơ nhiều kỷ niệm, cảm xúc mạnh mẽ.",
      price: 72000,
      stock: 95,
      publishYear: 1989,
      publisher: "Nhà xuất bản Kim Đồng",
      pages: 176,
      isbn: "978-604-1-00085-1",
      coverImage:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
      isFeatured: false,
      authorId: authors[0].id,
      categoryId: categories[0].id,
    },
    {
      title: "Đêm Giữa Ban Ngày",
      slug: "dem-giua-ban-ngay",
      description: "Tiểu thuyết đương đại với nhiều suy tư, trăn trở.",
      price: 98000,
      originalPrice: 120000,
      stock: 110,
      publishYear: 2019,
      publisher: "Nhà xuất bản Hội Nhà Văn",
      pages: 296,
      isbn: "978-604-1-00090-5",
      coverImage:
        "https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=600",
      isFeatured: false,
      authorId: authors[4].id,
      categoryId: categories[1].id,
    },
    {
      title: "Nghệ Thuật Sống Tối Giản",
      slug: "nghe-thuat-song-toi-gian",
      description:
        "Sống đơn giản, ý nghĩa và hạnh phúc hơn trong thế giới hiện đại.",
      price: 89000,
      stock: 130,
      publishYear: 2020,
      publisher: "Nhà xuất bản Thế Giới",
      pages: 240,
      isbn: "978-604-1-00095-0",
      coverImage:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600",
      isFeatured: false,
      authorId: authors[5].id,
      categoryId: categories[3].id,
    },
    {
      title: "Tư Duy Nhanh Và Chậm",
      slug: "tu-duy-nhanh-va-cham",
      description:
        "Hai hệ thống tư duy và tác động của chúng đến quyết định của con người.",
      price: 159000,
      originalPrice: 195000,
      stock: 85,
      publishYear: 2011,
      publisher: "Nhà xuất bản Thế Giới",
      pages: 512,
      isbn: "978-604-1-00100-3",
      coverImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
      isFeatured: true,
      authorId: authors[6].id,
      categoryId: categories[4].id,
    },
    {
      title: "Cà Phê Cùng Tony",
      slug: "ca-phe-cung-tony",
      description:
        "Những trải nghiệm, suy ngẫm về cuộc sống, học tập, công việc.",
      price: 79000,
      stock: 170,
      publishYear: 2016,
      publisher: "Nhà xuất bản Thế Giới",
      pages: 268,
      isbn: "978-604-1-00105-8",
      coverImage:
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600",
      isFeatured: false,
      authorId: authors[3].id,
      categoryId: categories[3].id,
    },
    {
      title: "Khi Hơi Thở Hóa Thinh Không",
      slug: "khi-hoi-tho-hoa-thinh-khong",
      description:
        "Hồi ký xúc động của bác sĩ đối mặt với ung thư và ý nghĩa cuộc sống.",
      price: 109000,
      originalPrice: 135000,
      stock: 120,
      publishYear: 2016,
      publisher: "Nhà xuất bản Lao Động",
      pages: 256,
      isbn: "978-604-1-00110-2",
      coverImage:
        "https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=600",
      isFeatured: true,
      authorId: authors[9].id,
      categoryId: categories[1].id,
    },

    // Bổ sung để đủ 25+
    {
      title: "Biên Niên Ký Chim Vặn Dây Cót",
      slug: "bien-nien-ky-chim-van-day-cot",
      description:
        "Tiểu thuyết tiêu biểu của Murakami, đan xen hiện thực và siêu thực.",
      price: 179000,
      stock: 95,
      publishYear: 1994,
      publisher: "Nhà xuất bản Hội Nhà Văn",
      pages: 607,
      isbn: "978-604-1-00120-1",
      coverImage:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600",
      isFeatured: false,
      authorId: authors[2].id,
      categoryId: categories[1].id,
    },
    {
      title: "1Q84 (Tập 1)",
      slug: "1q84-tap-1",
      description:
        "Câu chuyện song song giữa thực tại và một thế giới 1Q84 bí ẩn.",
      price: 165000,
      stock: 90,
      publishYear: 2009,
      publisher: "Nhà xuất bản Hội Nhà Văn",
      pages: 528,
      isbn: "978-604-1-00121-8",
      coverImage:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600",
      isFeatured: false,
      authorId: authors[2].id,
      categoryId: categories[1].id,
    },
    {
      title: "Nhà Sư Bán Chiếc Ferrari",
      slug: "nha-su-ban-chiec-ferrari",
      description:
        "Câu chuyện truyền cảm hứng về tỉnh thức và sống có mục đích.",
      price: 99000,
      stock: 140,
      publishYear: 1997,
      publisher: "Nhà xuất bản Trẻ",
      pages: 240,
      isbn: "978-604-1-00122-5",
      coverImage:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600",
      isFeatured: false,
      authorId: authors[5].id,
      categoryId: categories[3].id,
    },
    {
      title: "21 Bài Học Cho Thế Kỷ 21",
      slug: "21-bai-hoc-cho-the-ky-21",
      description:
        "Những suy ngẫm của Harari về công nghệ, chính trị, giáo dục thời hiện đại.",
      price: 189000,
      stock: 120,
      publishYear: 2018,
      publisher: "Nhà xuất bản Thế Giới",
      pages: 432,
      isbn: "978-604-1-00123-2",
      coverImage:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600",
      isFeatured: true,
      authorId: authors[6].id,
      categoryId: categories[4].id,
    },
    {
      title: "Harry Potter Và Tên Tù Nhân Ngục Azkaban",
      slug: "harry-potter-va-ten-tu-nhan-nguc-azkaban",
      description:
        "Phần ba với sự xuất hiện của Sirius Black và nhiều bí ẩn mới.",
      price: 145000,
      stock: 200,
      publishYear: 1999,
      publisher: "Nhà xuất bản Trẻ",
      pages: 448,
      isbn: "978-604-1-00124-9",
      coverImage:
        "https://images.unsplash.com/photo-1589998059171-988d887df646?w=600",
      isFeatured: true,
      authorId: authors[7].id,
      categoryId: categories[0].id,
    },
    {
      title: "Người Khổng Lồ Tốt Bụng (The BFG)",
      slug: "the-bfg",
      description:
        "Hành trình kỳ diệu của cô bé Sophie và người khổng lồ tốt bụng.",
      price: 92000,
      stock: 150,
      publishYear: 1982,
      publisher: "Nhà xuất bản Kim Đồng",
      pages: 224,
      isbn: "978-604-1-00125-6",
      coverImage:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600",
      isFeatured: false,
      authorId: authors[8].id,
      categoryId: categories[0].id,
    },
  ];

  const createdBooks = [];
  for (const bookData of books) {
    const book = await prisma.book.upsert({
      where: { slug: bookData.slug },
      update: bookData,
      create: bookData,
    });
    createdBooks.push(book);

    // Gắn 3 ảnh phụ cố định cho mỗi sách
    const imageUrls = [
      `https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600`,
      `https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600`,
      `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600`,
    ];

    await prisma.bookImage.deleteMany({ where: { bookId: book.id } });

    await prisma.bookImage.createMany({
      data: imageUrls.map((url, index) => ({
        url,
        alt: `${bookData.title} - Ảnh ${index + 1}`,
        order: index + 1,
        bookId: book.id,
      })),
      skipDuplicates: true,
    });
  }
  console.log(`✅ Đã tạo ${createdBooks.length} đầu sách\n`);

  // 4) Ngẫu nhiên hoá sold/view
  console.log("📊 Đang cập nhật thống kê sách...");
  for (const book of createdBooks) {
    const randomSold = Math.floor(Math.random() * 500);
    const randomViews = randomSold * 10 + Math.floor(Math.random() * 2000);
    await prisma.book.update({
      where: { id: book.id },
      data: { soldCount: randomSold, viewCount: randomViews },
    });
  }
  console.log("✅ Đã cập nhật thống kê\n");

  // 5) Thống kê
  const totalCategories = await prisma.category.count();
  const totalAuthors = await prisma.author.count();
  const totalBooks = await prisma.book.count();
  const totalImages = await prisma.bookImage.count();
  const featuredBooks = await prisma.book.count({ where: { isFeatured: true } });
  const booksWithDiscount = await prisma.book.count({
    where: { originalPrice: { not: null } },
  });

  console.log("📊 Thống kê cơ sở dữ liệu:");
  console.log(`   Danh mục: ${totalCategories}`);
  console.log(`   Tác giả: ${totalAuthors}`);
  console.log(`   Đầu sách: ${totalBooks}`);
  console.log(`   - Nổi bật: ${featuredBooks}`);
  console.log(`   - Có giảm giá: ${booksWithDiscount}`);
  console.log(`   Ảnh: ${totalImages}\n`);

  // 6) Bảng xếp hạng
  console.log("🏆 Bảng xếp hạng sách:");
  const topSellers = await prisma.book.findMany({
    take: 5,
    orderBy: { soldCount: "desc" },
    include: { author: true },
  });
  console.log("\n📈 Top 5 bán chạy nhất:");
  topSellers.forEach((book, i) => {
    console.log(`   ${i + 1}. ${book.title} - ${book.author.name} (${book.soldCount} bản)`);
  });

  const mostViewed = await prisma.book.findMany({
    take: 5,
    orderBy: { viewCount: "desc" },
    include: { author: true },
  });
  console.log("\n👀 Top 5 được xem nhiều nhất:");
  mostViewed.forEach((book, i) => {
    console.log(`   ${i + 1}. ${book.title} - ${book.author.name} (${book.viewCount} lượt xem)`);
  });

  console.log("\n✅ Hoàn tất seed dữ liệu!\n");
}

main()
  .catch((error) => {
    console.error("\n❌ Seed dữ liệu thất bại:", error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
