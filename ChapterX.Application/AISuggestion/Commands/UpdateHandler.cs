using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.AISuggestion.Commands
{
    public class UpdateHandler : IRequestHandler<UpdateRequest, UpdateResponse>
    {
        private readonly IAISuggestionRepository _aiSuggestionRepository;
        private readonly ILogger<UpdateHandler> _logger;

        public UpdateHandler(IAISuggestionRepository aiSuggestionRepository, ILogger<UpdateHandler> logger)
        {
            _aiSuggestionRepository = aiSuggestionRepository;
            _logger = logger;
        }

        public async Task<UpdateResponse> Handle(UpdateRequest request, CancellationToken cancellationToken)
        {
            var suggestion = await _aiSuggestionRepository.GetByIdAsync(request.Id, cancellationToken);
            if (suggestion is null)
                return new UpdateResponse(false);

            suggestion.OriginalText = request.OriginalText;
            suggestion.SuggestedText = request.SuggestedText;
            suggestion.Accepted = request.Accepted;
            if (request.Accepted)
                suggestion.AppliedAt = DateTime.UtcNow;

            await _aiSuggestionRepository.UpdateAsync(suggestion, cancellationToken);

            return new UpdateResponse(true);
        }
    }
}
