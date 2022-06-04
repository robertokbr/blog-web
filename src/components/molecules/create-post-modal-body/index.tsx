import { CreatePostModalBodyProps } from "./create-post-modal-body.type";
import styles from './create-post-modal-body.module.scss'; 
import { useMemo } from "react";
import { markdown } from "../../../services/markdown";
import { Avatar, FormControl, ModalBody } from "@chakra-ui/react";
import { Textarea } from "../../atoms/textarea";

export function CreatePostModalBody({ 
  data: { title, content, createdAt, user },
  isVisible,
  handleInputData,
  inputData
}: CreatePostModalBodyProps) {
  const formatted = useMemo(() => markdown.render(content),[content]);

  const date = useMemo(() => {
    return new Date(createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }, [createdAt]);

  return (
    <ModalBody pb={6} mt="2">
      <FormControl display="flex" flexDirection="row">
        {!isVisible && <Avatar name={user?.name} src={user?.image} />}
        {isVisible ? (
          <article className={styles.post}>
            <time>{date}</time>
            <h1>{title}</h1>
            <div 
              className={styles.postContent}
              dangerouslySetInnerHTML={{ __html: formatted }} 
            />
          </article>
        ):(
          <Textarea 
            defaultValue={inputData} 
            onChange={handleInputData} 
            size="md"
          />
        )}
      </FormControl>
    </ModalBody>
  );
}