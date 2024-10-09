import { Controller, Delete, Get, Put } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Put('/products/:code')
  updateProduct(): string {
    return 'Será responsável por receber atualizações do Projeto Web';
  }

  @Delete('/products/:code')
  deleteProduct(): string {
    return 'Mudar o status do produto para `trash`';
  }

  @Get('/products/:code')
  getProduct(): string {
    return 'Obter a informação somente de um produto da base de dados';
  }

  @Get('/products')
  listProducts(): string {
    return 'Listar todos os produtos da base de dados, adicionar sistema de paginação para não sobrecarregar o `REQUEST`.';
  }
}
