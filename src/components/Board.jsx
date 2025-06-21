import React from "react"
import { getPawnCoordinates } from "../utils/pawnPath"

export default function Board({ positions, onPawnClick }) {
  return (
    <div className="ludo-board">
      {/* caminho e casas */}
      {Object.entries(positions).map(([player, pawns]) =>
        pawns.map((pos, i) => {
          const [x, y] = getPawnCoordinates(player, pos, i)
          return (
            <div
              key={`${player}-${i}`}
              className={`pawn ${player}`}
              style={{ left: `${x}px`, top: `${y}px` }}
              onClick={() => onPawnClick(i)}
            >
              {i + 1}
            </div>
          )
        })
      )}
    </div>
  )
}
