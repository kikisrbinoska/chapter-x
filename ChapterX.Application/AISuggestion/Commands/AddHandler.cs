using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.AISuggestion.Commands
{
    public class AddHandler : IRequestHandler<AddRequest, AddResponse>
    {
        private readonly IAISuggestionRepository _aiSuggestionRepository;
        private readonly ILogger<AddHandler> _logger;

        public AddHandler(IAISuggestionRepository aiSuggestionRepository, ILogger<AddHandler> logger)
        {
            _aiSuggestionRepository = aiSuggestionRepository;
            _logger = logger;
        }

        public async Task<AddResponse> Handle(AddRequest request, CancellationToken cancellationToken)
        {
            var suggestion = new Domain.Entities.AISuggestion
            {
                OriginalText = request.OriginalText,
                SuggestedText = request.SuggestedText,
                StoryId = request.StoryId,
                Accepted = null,
                CreatedAt = DateTime.UtcNow
            };

            await _aiSuggestionRepository.AddAsync(suggestion, cancellationToken);

            return new AddResponse(suggestion.Id);
        }
    }
}
