import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "97102b91a0bc4d589e34aba1e8f495ad";
const token =
  "00697102b91a0bc4d589e34aba1e8f495adIACuL62hNjOUNkCdY/Y81cHSzqrMYznlY8e7eZcO7tlKjmTNKL8AAAAAEACKbcvB/wpgYgEAAQD+CmBi";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

