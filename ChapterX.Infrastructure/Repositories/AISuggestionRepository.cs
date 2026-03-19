using ChapterX.Domain.Entities;
using ChapterX.Domain.Repositories;
using ChapterX.Infrastructure.Data.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace ChapterX.Infrastructure.Repositories
{
    public class AISuggestionRepository : GenericRepository<AISuggestion>, IAISuggestionRepository
    {
        public AISuggestionRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<AISuggestion>> GetByChapterIdAsync(int chapterId, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Where(a => a.StoryId == chapterId)
                .ToListAsync(cancellationToken);
        }
    }
}
