import wallet from "../wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { readFile } from "fs/promises";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));
umi.use(irysUploader());
(async () => {
  try {
    const image = await readFile(
      "/home/leo/solana/wba/wba-solana-starter/ts/cluster1/images/generug.png"
    );

    const [myUri] = await umi.uploader.upload([
      createGenericFile(image, "generug", {
        contentType: "image/png",
      }),
    ]);

    // const [myUri] = await bundlrUploader.upload([
    //   createGenericFile(image, "generug.png", {
    //     contentType: "image/png",
    //   }),
    // ]);

    console.log("Your image URI: ", myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
