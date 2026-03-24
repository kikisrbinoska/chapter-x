using ChapterX.Domain.Entities;
using ChapterX.Domain.Repositories;
using ChapterX.Infrastructure.Data.DataContext;
using Microsoft.EntityFrameworkCore;

namespace ChapterX.Infrastructure.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<User>> GetAllAsync(CancellationToken cancellationToken = default)
            => await _dbSet
                .Include(u => u.Admin)
                .Include(u => u.Writer)
                .ToListAsync(cancellationToken);

        public async Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
            => await _dbSet
                .Include(u => u.Admin)
                .Include(u => u.Writer)
                .Include(u => u.RegularUser)
                .FirstOrDefaultAsync(u => u.Email == email, cancellationToken);

        public async Task<User?> GetByUsernameAsync(string username, CancellationToken cancellationToken = default)
            => await _dbSet.FirstOrDefaultAsync(u => u.Username == username, cancellationToken);
    }
}
