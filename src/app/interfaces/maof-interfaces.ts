/**
 * Created by huser on 15/02/2017.
 */
export interface MaofFrequency {
    freq: number;
    isAd: boolean;
    isPlay: boolean;
}

export interface MaofResponse {
    data: MaofFrequency[];
    song: string;
}