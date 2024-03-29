import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ProductListItemSkeleton } from 'entities/Product/ui/ProductListItem/ProductListItemSkeleton';
import { Text } from 'shared/ui/Text/Text';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { addUserProduct, AddUserProductProps } from 'entities/User/model/services/addUserProduct';
import { productsPageActions } from 'pages/MainPage/model/slices/productsPageSlice';
import { Product } from '../../model/types/product';
import cls from './ProductList.module.scss';
import { ProductListItem } from '../ProductListItem/ProductListItem';

interface ProductListProps {
  className?: string;
  products: Product[];
  isLoading?: boolean;
}

export const ProductList = memo((props: ProductListProps) => {
    const {
        className,
        products,
        isLoading,
    } = props;
    const { t } = useTranslation();
    const isAuth = useSelector(getUserAuthData);
    const dispatch = useDispatch();

    const addProduct = useCallback((productUserProps: AddUserProductProps) => {
        dispatch(productsPageActions.setProductIsLoading({
            id: productUserProps.id,
            isLoading: true,
        }));
        dispatch(addUserProduct(productUserProps));
        console.log('add Product');
    }, [dispatch]);
    if (isLoading) {
        return (
            <div className={classNames(cls.ProductList, {}, [className])}>
                {new Array(12).fill(0).map((item, index) => (
                    <ProductListItemSkeleton key={index} />
                ))}
            </div>
        );
    }

    const renderProduct = (product: Product) => (
        <ProductListItem isAuth={isAuth !== undefined} addProduct={addProduct} product={product} key={product.id} />
    );

    return (
        <div className={classNames(cls.ProductList, {}, [className])}>
            {products.length > 0
                ? products.map(renderProduct)
                : <Text className={cls.empty} text={t('Товары не найденны')} /> }
        </div>
    );
});
