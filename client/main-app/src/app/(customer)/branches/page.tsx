import CinemaMap from "@/components/cinema-map"
import CinemaList from "@/components/cinema-list"
import { CinemaBranch } from "@/types/index"

export default function Home() {
    const cinemas: CinemaBranch[] = [
        {
          _id: "1",
          name: "CGV Vincom Center Đồng Khởi",
          address: "Tầng 3, TTTM Vincom Center, 72 Lê Thánh Tôn, P. Bến Nghé, Quận 1, TP. HCM",
          lat: 10.7765,
          lng: 106.7019,
          rooms: [
            { _id: "1-1", name: "Cinema 1", capacity: 120 },
            { _id: "1-2", name: "Cinema 2", capacity: 100 },
            { _id: "1-3", name: "Cinema 3", capacity: 80 },
          ],
        },
        {
          _id: "2",
          name: "CGV Aeon Mall Bình Tân",
          address: "Tầng 3, TTTM Aeon Mall Bình Tân, Số 1 đường số 17A, P. Bình Trị Đông B, Quận Bình Tân, TP. HCM",
          lat: 10.7428,
          lng: 106.6147,
          rooms: [
            { _id: "2-1", name: "Cinema 1", capacity: 150 },
            { _id: "2-2", name: "Cinema 2", capacity: 120 },
          ],
        },
        {
          _id: "3",
          name: "BHD Star Cineplex - Bitexco",
          address: "Tầng 3 & 4, TTTM Icon 68, 2 Hải Triều, P. Bến Nghé, Quận 1, TP. HCM",
          lat: 10.7721,
          lng: 106.7037,
          rooms: [
            { _id: "3-1", name: "Cinema 1", capacity: 130 },
            { _id: "3-2", name: "Cinema 2", capacity: 110 },
            { _id: "3-3", name: "Cinema 3", capacity: 90 },
          ],
        },
        {
          _id: "4",
          name: "Lotte Cinema Nowzone",
          address: "Tầng 5, TTTM Nowzone, 235 Nguyễn Văn Cừ, P. Nguyễn Cư Trinh, Quận 1, TP. HCM",
          lat: 10.7632,
          lng: 106.6816,
          rooms: [
            { _id: "4-1", name: "Cinema 1", capacity: 140 },
            { _id: "4-2", name: "Cinema 2", capacity: 120 },
          ],
        },
        {
          _id: "5",
          name: "Galaxy Cinema Nguyễn Du",
          address: "116 Nguyễn Du, P. Bến Thành, Quận 1, TP. HCM",
          lat: 10.7725,
          lng: 106.6954,
          rooms: [
            { _id: "5-1", name: "Cinema 1", capacity: 100 },
            { _id: "5-2", name: "Cinema 2", capacity: 80 },
          ],
        },
        {
          _id: "6",
          name: "CGV Crescent Mall",
          address: "Lầu 5, Crescent Mall, 101 Tôn Dật Tiên, P. Tân Phú, Quận 7, TP. HCM",
          lat: 10.7295,
          lng: 106.718,
          rooms: [
            { _id: "6-1", name: "Cinema 1", capacity: 160 },
            { _id: "6-2", name: "Cinema 2", capacity: 140 },
            { _id: "6-3", name: "Cinema 3", capacity: 120 },
          ],
        },
        {
          _id: "7",
          name: "BHD Star Cineplex - Phạm Hùng",
          address: "Tầng 4, TTTM Satra Phạm Hùng, C6/27 Phạm Hùng, P. Bình Hưng, Quận 8, TP. HCM",
          lat: 10.7326,
          lng: 106.6683,
          rooms: [
            { _id: "7-1", name: "Cinema 1", capacity: 130 },
            { _id: "7-2", name: "Cinema 2", capacity: 110 },
          ],
        },
        {
          _id: "8",
          name: "Lotte Cinema Cantavil",
          address: "Tầng 7, Cantavil Premier, Số 1 đường Song Hành, P. An Phú, Quận 2, TP. HCM",
          lat: 10.8031,
          lng: 106.7476,
          rooms: [
            { _id: "8-1", name: "Cinema 1", capacity: 150 },
            { _id: "8-2", name: "Cinema 2", capacity: 130 },
            { _id: "8-3", name: "Cinema 3", capacity: 110 },
          ],
        },
        {
          _id: "9",
          name: "CGV Sư Vạn Hạnh",
          address: "Tầng 6, Vạn Hạnh Mall, 11 Sư Vạn Hạnh, P. 12, Quận 10, TP. HCM",
          lat: 10.7712,
          lng: 106.6704,
          rooms: [
            { _id: "9-1", name: "Cinema 1", capacity: 140 },
            { _id: "9-2", name: "Cinema 2", capacity: 120 },
          ],
        },
        {
          _id: "10",
          name: "Galaxy Cinema Kinh Dương Vương",
          address: "718bis Kinh Dương Vương, P. 13, Quận 6, TP. HCM",
          lat: 10.7459,
          lng: 106.6336,
          rooms: [
            { _id: "10-1", name: "Cinema 1", capacity: 120 },
            { _id: "10-2", name: "Cinema 2", capacity: 100 },
          ],
        },
      ]
      
      
  return (
    <main className="flex min-h-screen flex-col">
      <header className="bg-primary p-4">
        <h1 className="text-2xl font-bold text-white">Cinema Branches Map</h1>
      </header>
      <div className="flex flex-col md:flex-row flex-1">
        <div className="w-full md:w-1/3 p-4 overflow-y-auto max-h-[calc(100vh-64px)]">
          <CinemaList cinemas={cinemas} />
        </div>
        <div className="w-full md:w-2/3 h-[500px] md:h-[calc(100vh-64px)]">
          <CinemaMap cinemas={cinemas} />
        </div>
      </div>
    </main>
  )
}

