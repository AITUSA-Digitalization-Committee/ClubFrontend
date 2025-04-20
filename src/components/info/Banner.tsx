import { IClub } from "@/types";


function Banner({ club }: { club: IClub }) {
    return (
        <div className="bg-muted rounded-2xl h-40 overflow-hidden">
            <img
                src={club.banner}
                className="object-contain w-full h-full"
            />
        </div>
    );
}

export default Banner;