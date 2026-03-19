using MediatR;

namespace ChapterX.Application.AISuggestion.Queries
{
    public record GetAllRequest() : IRequest<GetAllResponse>;
}
