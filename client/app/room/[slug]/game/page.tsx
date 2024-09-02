"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "react-feather";
import PlayerDeck from "@/components/PlayerDeck";
import GameBoard from "@/components/GameBoard";
import { GameProvider, useGameContext } from "@/components/GameProvider";
import OpponentDeck from "@/components/OpponentDeck";
import BoneYard from "@/components/BoneYard";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useSocket } from "@/components/SocketProvider";
import useCreateAPI from "@/utils/api";
import { toast } from "react-toastify";
import { Game, numberPair } from "@/types";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import FirstPlay from "@/components/FirstPlay";

function GamePage({ params }: { params: { slug: string } }) {
  const [game, setGame] = useState<Game | null>(null);

  // console.log(boneyard, deck, isTurn);

  return (
    <GameProvider>
      <div
        id="game"
        className='bg-dark-blue bg-[url("/game-bg.png")] relative bg-cover justify-center bg-center flex items-end min-w-screen min-h-screen overflow-hidden'
      >
        <div className="bg-main-blue  relative border-[9px] rounded-2xl border-black-15 w-full min-h-[calc(100vh_-_24px)] h-full max-w-[700px]">
          <div className="bg-main-blue rounded-9 w-full h-full"></div>
          <div
            id="current-player"
            className="absolute -bottom-2 bg-[#617187] w-[calc(100%_+_6px)] rounded-t-9 -left-0.5 flex p-2 justify-between items-center z-10"
          >
            <div className="w-[60px] h-[60px]">
              <Image
                src="/default-avatar.png"
                width={60}
                height={60}
                alt="avatar"
                className="rounded-lg"
              />
            </div>

            <PlayerDeck />

            <div className="text-center">
              <p>0</p>
              <p className="text-xs text-[#afb7c1]">points</p>
            </div>
          </div>

          <Link id="back-button" className="pointer-events-auto z-[2]" href="/">
            <div className="absolute flex items-center justify-center z-[2] -left-8 top-12 bg-main-orange w-[60px] h-[60px] rounded-9">
              <ArrowLeft size={24} color="#ffffff" />
            </div>
          </Link>

          <div
            id="game-count"
            className="absolute gap-6 pt-7 pb-4 flex items-center justify-center flex-col -right-8 top-12 bg-main-gray w-[60px] rounded-9"
          >
            <Image
              src="/dots.png"
              width="10"
              height="10"
              alt="dots"
              className="h-2.5 w-2.5 mx-auto"
            />
            <p>20</p>
          </div>
          <GameBoard />
          <BoneYard />
          <FirstPlay />
        </div>
        <OpponentDeck />
      </div>
    </GameProvider>
  );
}

export default GamePage;
