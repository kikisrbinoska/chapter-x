using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.AISuggestion.Queries
{
    public class GetAllHandler : IRequestHandler<GetAllRequest, GetAllResponse>
    {
        private readonly IAISuggestionRepository _aiSuggestionRepository;
        private readonly ILogger<GetAllHandler> _logger;

        public GetAllHandler(IAISuggestionRepository aiSuggestionRepository, ILogger<GetAllHandler> logger)
        {
            _aiSuggestionRepository = aiSuggestionRepository;
            _logger = logger;
        }

        public async Task<GetAllResponse> Handle(GetAllRequest request, CancellationToken cancellationToken)
        {
            var suggestions = await _aiSuggestionRepository.GetAllAsync(cancellationToken);
            return new GetAllResponse(suggestions);
        }
    }
}
