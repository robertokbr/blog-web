import { Icon, Stack, Text, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { useAuth } from "../../../states/hooks/use-auth";
import { simpleHover } from "../../../styles/theme";
import { createPostRateErrorToast, LoginErrorToast } from "../../../utils/toast";
import { PostRateControlContainer } from "../../atoms/post-rate-control-container";
import { RateValue } from "./post-rate-control.enum";
import { PostRateControlProps } from "./post-rate-control.type";
import { UserDto } from '../../../services/api/models/UserDto'

export function PostRateControl({
  handleRate,
  data: { rates },
  hideRateControl,
  isDislikeEnabled,
  controllSide = "left",
  size,
}: PostRateControlProps) {
  const { data } = useAuth();
  const toast = useToast();
  // State local because it could be post-rate or comment-rate
  const [rateData, setRateData] = useState(rates);
  const [rateSum, setRateSum] = useState(0);
  const [userVote, setUserVote] = useState<undefined | RateValue>();
  const [dislikePosition, setDislikePosition] = useState({});

  const changeDislikePosition = useCallback(() => {
    if (isDislikeEnabled) return;
    setDislikePosition(state => !Object.keys(state).length ? {
      height: '80%',
    } : {});
  }, [isDislikeEnabled]);

  useEffect(() => {
    const sum = [...rateData].reduce((a, b) => a + b.value, 0);
    const rateI = [...rateData].findIndex(rate => rate.userId === data?.user?.id);
    if (rateI >= 0) setUserVote(rateData[rateI].value);
    setRateSum(sum);
  }, [data?.user?.id, rateData]);

  const handlePostRate = useCallback(async (value: number) => {
    if (!data) {
      toast({ title: 'You must be logged in to rate', ...LoginErrorToast });
    }

    if (userVote && userVote === value) return;
    const newRate = [...rateData];

    if (userVote) {
      const userVoteIndex = newRate.findIndex(r => r.userId === data?.user?.id);
      newRate[userVoteIndex].value = value;
    } else {
      newRate.push({ value, userId: data?.user?.id } as any);
    }

    setRateData(newRate as any);
    await handleRate(value).catch(() => toast(createPostRateErrorToast));
  }, [data, userVote, rateData, handleRate, toast]);

  const counterSize = useMemo(() => {
    const sizeValues = {
      md: {
        iconSize: 28,
        textSize: 'md',
        iconsSpacing: 2,
        minH: 32,
      },
      sm: {
        iconSize: 20,
        textSize: 'sm',
        iconsSpacing: 0.1,
        minH: 24,
      }
    }

    return sizeValues[size];
  }, [size]);

  return (
    <PostRateControlContainer
      controllSide={controllSide}
      handleOnMouseLeave={() => setDislikePosition({})}
      hideRateControl={hideRateControl}
      iconsSpacing={counterSize.iconsSpacing}
    >
      <Icon
        transition="0.2s"
        as={AiOutlineCaretUp}
        fontSize={counterSize.iconSize}
        color={userVote === RateValue.UP ? "pink.400" : "gray.600"}
        _hover={simpleHover}
        onClick={() => handlePostRate(RateValue.UP)}
        {...dislikePosition}
      />
     {data?.user?.role === UserDto.role.ADMIN && (
       <Text
        fontSize={counterSize.textSize}
        fontWeight="medium"
        color="pink.400"
      >
        {rateSum}
      </Text>
     )}
      <Icon
        transition="0.2s"
        as={AiOutlineCaretDown}
        fontSize={counterSize.iconSize}
        _hover={simpleHover}
        onMouseEnter={changeDislikePosition}
        color={userVote === RateValue.DOWN ? "pink.400" : "gray.600"}
        onClick={() => handlePostRate(RateValue.DOWN)}
      />
    </PostRateControlContainer>
  );
}
