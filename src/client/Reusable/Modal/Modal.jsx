import styles from "./Modal.module.scss"

const Modal =({active,setActive,children})=>(
 <div className={ active ? `${styles.modal} ${styles.active}` : styles.modal} onClick={()=> setActive(false)}>
    <div className={styles.modal__content} onClick={e => e.stopPropagation()}>
       {children}
    </div>
</div>  
)

 

export default Modal