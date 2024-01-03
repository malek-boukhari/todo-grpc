import React, { JSX, useState } from 'react';
import { DeleteOutlined, TagTwoTone } from '@ant-design/icons';
import { Button } from 'antd';
import { useCategoryStore } from '../../../../store/Category.store.ts';
import { Category } from '../../../../generated/category_pb.ts';

function CategoryLabel(props: { category: Category }): JSX.Element {
    const { setCurrentCategory, setShowDeleteCategory, setShowEditCategory } = useCategoryStore();

    const [showDeleteBtn, setShowDeleteBtn] = useState<boolean>(false);

    const category = props.category;

    function editCategory(e: React.MouseEvent<HTMLElement>): void {
        e.preventDefault();
        setCurrentCategory(category);
        setShowEditCategory(true);
    }

    function openDeleteModal(e: React.MouseEvent<HTMLElement>): void {
        e.stopPropagation();
        setCurrentCategory(category);
        setShowDeleteCategory(true);
    }

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
            onMouseEnter={() => setShowDeleteBtn(true)}
            onMouseLeave={() => setShowDeleteBtn(false)}
            onClick={(e) => editCategory(e)}
            role={'button'}
        >
            <div>
                <TagTwoTone twoToneColor={category.color} />
                <span>{category.name}</span>
            </div>
            {showDeleteBtn && (
                <Button
                    type={'text'}
                    onClick={(e: React.MouseEvent<HTMLElement>) => openDeleteModal(e)}
                    size={'small'}
                >
                    <DeleteOutlined color={'danger'} />
                </Button>
            )}
        </div>
    );
}

export default CategoryLabel;
