import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  TextField,
  Button,
  InputAdornment,
  Divider,
} from '@mui/material';
import { 
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';

const Filters = ({ filters, onFiltersChange, accounts }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  
  const months = [
    { value: 1, label: 'Janeiro' },
    { value: 2, label: 'Fevereiro' },
    { value: 3, label: 'Março' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Maio' },
    { value: 6, label: 'Junho' },
    { value: 7, label: 'Julho' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Setembro' },
    { value: 10, label: 'Outubro' },
    { value: 11, label: 'Novembro' },
    { value: 12, label: 'Dezembro' },
  ];

  const categories = [
    'Alimentação',
    'Transporte',
    'Moradia',
    'Saúde',
    'Educação',
    'Entretenimento',
    'Vestuário',
    'Salário',
    'Freelance',
    'Investimentos',
    'Outros'
  ];

  const handleFilterChange = (field) => (event) => {
    onFiltersChange({ [field]: event.target.value });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      month: '',
      year: '',
      transactionType: '',
      category: '',
      accountId: '',
      description: '',
      minAmount: '',
      maxAmount: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '' && value !== null && value !== undefined);

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Box display="flex" alignItems="center">
            <FilterListIcon sx={{ mr: 1 }} color="primary" />
            <Typography variant="h6" fontWeight="bold">
              🔍 Filtros de Transações
            </Typography>
          </Box>
          
          {hasActiveFilters && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<ClearIcon />}
              onClick={handleClearFilters}
              color="secondary"
              sx={{ borderRadius: 2 }}
            >
              Limpar Todos
            </Button>
          )}
        </Box>

        <Grid container spacing={2}>
          {/* Search by Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="🔍 Pesquisar por descrição"
              variant="outlined"
              value={filters.description || ''}
              onChange={handleFilterChange('description')}
              placeholder="Digite para pesquisar..."
              sx={{ mb: 1 }}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Filtros por Período
              </Typography>
            </Divider>
          </Grid>

          {/* Date Filters */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>📅 Mês</InputLabel>
              <Select
                value={filters.month || ''}
                label="📅 Mês"
                onChange={handleFilterChange('month')}
              >
                <MenuItem value="">Todos os meses</MenuItem>
                {months.map((month) => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>📆 Ano</InputLabel>
              <Select
                value={filters.year || ''}
                label="📆 Ano"
                onChange={handleFilterChange('year')}
              >
                <MenuItem value="">Todos os anos</MenuItem>
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Filtros por Tipo e Categoria
              </Typography>
            </Divider>
          </Grid>

          {/* Type and Category Filters */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>💰 Tipo</InputLabel>
              <Select
                value={filters.transactionType || ''}
                label="💰 Tipo"
                onChange={handleFilterChange('transactionType')}
              >
                <MenuItem value="">Todos os tipos</MenuItem>
                <MenuItem value="income">💚 Receita</MenuItem>
                <MenuItem value="expense">💸 Despesa</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>🏷️ Categoria</InputLabel>
              <Select
                value={filters.category || ''}
                label="🏷️ Categoria"
                onChange={handleFilterChange('category')}
              >
                <MenuItem value="">Todas as categorias</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Filtros por Valor
              </Typography>
            </Divider>
          </Grid>

          {/* Value Filters */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Valor Mínimo"
              type="number"
              variant="outlined"
              value={filters.minAmount || ''}
              onChange={handleFilterChange('minAmount')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MoneyIcon fontSize="small" />
                    R$
                  </InputAdornment>
                ),
              }}
              placeholder="0,00"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Valor Máximo"
              type="number"
              variant="outlined"
              value={filters.maxAmount || ''}
              onChange={handleFilterChange('maxAmount')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MoneyIcon fontSize="small" />
                    R$
                  </InputAdornment>
                ),
              }}
              placeholder="999999,99"
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Filtro por Conta
              </Typography>
            </Divider>
          </Grid>

          {/* Account Filter */}
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>🏦 Conta</InputLabel>
              <Select
                value={filters.accountId || ''}
                label="🏦 Conta"
                onChange={handleFilterChange('accountId')}
              >
                <MenuItem value="">Todas as contas</MenuItem>
                {accounts.map((account) => (
                  <MenuItem key={account.id} value={account.id}>
                    {account.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Help Text */}
        <Box mt={3} p={2} sx={{ 
          backgroundColor: 'action.hover', 
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider'
        }}>
          <Typography variant="caption" color="text.secondary" display="block">
            <strong>💡 Dica:</strong> Use os filtros acima para refinar a visualização das transações
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
            • Combine múltiplos filtros para uma busca mais específica
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            • Os filtros por valor funcionam com valores em reais (ex: 100.50)
          </Typography>
          
          {hasActiveFilters && (
            <Box mt={1}>
              <Typography variant="caption" color="primary.main" fontWeight="bold">
                ✅ {Object.values(filters).filter(v => v !== '' && v !== null && v !== undefined).length} filtro(s) ativo(s)
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Filters; 