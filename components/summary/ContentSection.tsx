function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^•/.test(point);
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u2600-\u26FF]/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();
  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

function parseEmojiPoint(content: string) {
  const cleanContent = content.replace(/^[-]\s]*/, '').trim();
  const matches = cleanContent.match(/^([\u{1F300}-\u{1F9FF}\u2600-\u26FF]+)\s+(.+)$/u);
  if (!matches) return null;
  const [_, emoji, text] = matches;
  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}

const EmojiPoint = ({ point, index }: { point: string; index: number }) => {
  const parsed = parseEmojiPoint(point);
  const emoji = parsed?.emoji ?? "";
  const text = parsed?.text ?? "";

  return (
    <div
      
      className="group relative bg-gradient-to-br from-gray-200/10 to-gray-400/10 p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <div className="relative flex items-start gap-3">
        <span className="text-lg lg:text-xl shrink-0 pt-1">{emoji}</span>
        <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">{text}</p>
      </div>
    </div>
  );
};

const RegularPoint = ({ point, index }: { point: string; index: number }) => {
  return (
    <div
      
      className="group relative bg-gradient-to-br from-gray-200/10 to-gray-400/10 p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <p className="relative text-lg lg:text-xl text-muted-foreground/90 leading-relaxed text-left">
        {point}
      </p>
    </div>
  );
};

export default function ContentSection({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <div className="space-y-4">
      {points.map((point, index) => {
        const { isNumbered, isMainPoint, hasEmoji, isEmpty } = parsePoint(point);
        if (isEmpty) return null;
        if (hasEmoji || isMainPoint) {
          return <EmojiPoint index={index} point={point} key={index} />;
        }
        return <RegularPoint index={index} point={point} key={index} />;
      })}
    </div>
  );
}