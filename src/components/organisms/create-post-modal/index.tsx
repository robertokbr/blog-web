import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Box,
  useToast,
} from "@chakra-ui/react"
import { useRouter } from "next/router";
import { useRef, cloneElement, useCallback, useEffect, useState, ReactElement } from "react"
import { CreatePostModalBody } from "../../molecules/create-post-modal-body";
import { defaultFormattedValue, formatMarkdown, revertMKFormatation } from "../../../utils/format-markdown";
import { logger } from "../../../services/logger";
import { createPostErrorToast } from "../../../utils/toast";
import { PostDto } from "../../../services/api/models";
import { useDraft } from "../../../states/hooks/use-draft";
import { CreatePostModalFooter } from "../../molecules/create-post-modal-footer";
import { Api } from "../../../services/api";

interface CreatePostModalProps {
  children: ReactElement;
  post?: PostDto;
}

const api = new Api("CreatePostModal");

/**
 * @summary
 * Component to create or edit post
 */
export function CreatePostModal({ children, post }: CreatePostModalProps) {
  const { handleAddDraft, handleGetDraft, handleRemoveDraft } = useDraft();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const history = useRouter();
  const toast = useToast();

  const [formattedValue, setFormattedValue] = useState(defaultFormattedValue);
  const [isVisible, setIsVisible] = useState(false);
  const [inputData, setInputData] = useState(
    handleGetDraft('create-post-modal')
  );

  useEffect(() => {
    if (post) {
      const { content, title, tags, image } = post;
      const stringTags = tags.map(tag => tag.name);
      setInputData(revertMKFormatation(title, content, stringTags));
      const createdAt = new Date().toString();
      setFormattedValue({ createdAt, content, image,title, tags });
      return;
    }
  }, [post]);

  const handleMarkdown = useCallback(() => {
    if (!inputData) {
      setFormattedValue(defaultFormattedValue);
      return defaultFormattedValue;
    }
    const formatedValue = formatMarkdown(inputData);
    setFormattedValue(formatedValue as any);
    return formatedValue;
  }, [inputData]);

  const handleMKVisibility = useCallback(() => {
    handleMarkdown();
    setIsVisible(state => !state);
  }, [handleMarkdown]);

  const handleSaveDraft = useCallback(() => {
    if (!post)
      handleAddDraft({ field: 'create-post-modal', content: inputData});
    onClose();
  }, [handleAddDraft, inputData, onClose, post]);

  const handleCreatePost = useCallback(async () => {
    const { createdAt, ...dto } = handleMarkdown();
    const basePostDto = { ...dto };
    try {
      if (post) {
        await api.updatePost(`${post.id}`, basePostDto);
      } else {
        await api.createPost(basePostDto);
      }
      handleRemoveDraft('create-post-modal');
      setFormattedValue(defaultFormattedValue);
      history.push('/');
      onClose();
    } catch (error) {
      toast(createPostErrorToast);
      logger.error({ error, context: "handleCreatePost" });
    }
  }, [toast, handleMarkdown, handleRemoveDraft, history, onClose, post]);

  const handleInputData = useCallback(v => setInputData(v.target.value), []);

  return (
    <>
      { cloneElement(children, { onClick: onOpen }) }
      <Modal
        isCentered
        size="2xl"
        isOpen={isOpen}
        blockScrollOnMount
        scrollBehavior="inside"
        onClose={handleSaveDraft}
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent bg="gray.800" mx="4">
          <ModalHeader color="gray.50">
            <ModalCloseButton  />
          </ModalHeader>
          <CreatePostModalBody
            data={{...formattedValue, user: post?.user }}
            handleInputData={handleInputData}
            inputData={inputData}
            isVisible={isVisible}
          />
          <Box height="0.5px" bg="gray.700" mx="8"/>
          <CreatePostModalFooter
            handleCreatePost={handleCreatePost}
            handleMKVisibility={handleMKVisibility}
            isVisible={isVisible}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
